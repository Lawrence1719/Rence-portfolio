import { NextRequest, NextResponse } from "next/server";

const GITHUB_API_URL = "https://api.github.com/graphql";

type GitHubCalendarDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type Language = {
  name: string;
  color: string | null;
};

type TopLanguage = Language & { size: number };

type GitHubResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: GitHubCalendarDay[];
          }[];
        };
        totalCommitContributions: number;
      };
      repositories: {
        nodes: {
          name: string;
          url: string;
          stargazerCount: number;
          diskUsage: number | null;
          primaryLanguage: Language | null;
        }[];
      };
    } | null;
  };
  errors?: { message: string }[];
};

export async function GET(req: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || process.env.GITHUB_USERNAME;

  if (!token) {
    return NextResponse.json(
      { error: "Missing GITHUB_TOKEN in environment variables" },
      { status: 500 },
    );
  }

  if (!username) {
    return NextResponse.json(
      { error: "Missing username. Provide ?username= or set GITHUB_USERNAME." },
      { status: 400 },
    );
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
        repositories(
          first: 20
          orderBy: { field: PUSHED_AT, direction: DESC }
          privacy: PUBLIC
          isFork: false
        ) {
          nodes {
            name
            url
            stargazerCount
            diskUsage
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: username },
      }),
      cache: "no-store",
    });

    const json = (await response.json()) as GitHubResponse;

    if (!response.ok || json.errors) {
      const message =
        json.errors?.map((e) => e.message).join(", ") ||
        `GitHub API error (status ${response.status})`;
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const user = json.data?.user;
    if (!user) {
      return NextResponse.json(
        { error: "No contribution data found for this user" },
        { status: 404 },
      );
    }

    const calendar = user.contributionsCollection.contributionCalendar;

    const days: GitHubCalendarDay[] = calendar.weeks.flatMap(
      (week) => week.contributionDays,
    );

    // Ensure days are sorted by date
    days.sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const totalContributions = calendar.totalContributions;
    const dayCount = days.length || 1;
    const dailyAverage = Math.round(totalContributions / dayCount);

    const totalCommitsThisYear =
      user.contributionsCollection.totalCommitContributions;

    // Build top languages list from repository primary languages
    const languageMap = new Map<string, TopLanguage>();
    user.repositories?.nodes.forEach((repo) => {
      const lang = repo.primaryLanguage;
      if (!lang) return;

      const existing = languageMap.get(lang.name);
      if (existing) {
        existing.size += 1;
      } else {
        languageMap.set(lang.name, {
          name: lang.name,
          color: lang.color,
          size: 1,
        });
      }
    });

    const topLanguages: TopLanguage[] = Array.from(languageMap.values())
      .sort((a, b) => b.size - a.size)
      .slice(0, 4);

    // Determine most active repo based on diskUsage heuristic (or stargazers as fallback)
    const mostActiveRepo = user.repositories?.nodes
      ?.slice()
      .sort((a, b) => {
        const aMetric = (a.diskUsage ?? 0) + a.stargazerCount * 10;
        const bMetric = (b.diskUsage ?? 0) + b.stargazerCount * 10;
        return bMetric - aMetric;
      })[0];

    // Calculate current streak (consecutive days with contributions up to the most recent day)
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].contributionCount > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return NextResponse.json({
      username,
      totalContributions,
      dailyAverage,
      currentStreak,
      totalCommitsThisYear,
      topLanguages,
      mostActiveRepo: mostActiveRepo
        ? {
            name: mostActiveRepo.name,
            url: mostActiveRepo.url,
            stargazerCount: mostActiveRepo.stargazerCount,
            primaryLanguage: mostActiveRepo.primaryLanguage,
          }
        : null,
      days,
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
    );
  }
}

