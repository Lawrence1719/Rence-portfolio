"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type TopLanguage = {
  name: string;
  color: string | null;
  size: number;
};

type MostActiveRepo = {
  name: string;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
} | null;

type GitHubStats = {
  username: string;
  totalContributions: number;
  dailyAverage: number;
  currentStreak: number;
  totalCommitsThisYear: number;
  topLanguages: TopLanguage[];
  mostActiveRepo: MostActiveRepo;
  days: ContributionDay[];
};

type Props = {
  username?: string;
};

export function GitHubContributions({ username }: Props) {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (username) {
          params.set("username", username);
        }

        const res = await fetch(
          `/api/github-contributions${params.toString() ? `?${params.toString()}` : ""}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to load GitHub data");
        }

        const json = (await res.json()) as GitHubStats;
        setData(json);
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [username]);

  if (loading) {
    return (
      <div className="mt-16 border border-primary/30 rounded-xl bg-background/40 backdrop-blur-md p-6 text-center text-sm text-muted-foreground font-mono">
        Fetching GitHub activity...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mt-16 border border-red-500/40 rounded-xl bg-background/40 backdrop-blur-md p-6 text-center text-sm text-red-400 font-mono">
        {error || "Unable to load GitHub contributions."}
      </div>
    );
  }

  const {
    totalContributions,
    dailyAverage,
    currentStreak,
    totalCommitsThisYear,
    topLanguages,
    mostActiveRepo,
    days,
  } = data;

  return (
    <section className="mt-16 border border-primary/40 rounded-xl bg-background/40 backdrop-blur-md p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="text-xl md:text-2xl font-mono font-semibold flex items-center gap-2">
          <span className="text-green-400">&gt;</span>
          <span className="text-foreground">
            github <span className="text-muted-foreground">contributions</span>
          </span>
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground font-mono">
          @{data.username}
        </p>
      </div>

      {/* Main stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total contributions"
          value={totalContributions.toLocaleString()}
        />
        <StatCard
          label="Current streak"
          value={currentStreak}
          suffix="days"
        />
        <StatCard
          label="Daily average"
          value={dailyAverage}
          suffix="contributions"
        />
      </div>

      {/* Extra stats + heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-6">
        {/* Left: extra stats */}
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-mono mb-1">
              Total commits this year
            </p>
            <p className="text-2xl font-mono font-semibold text-green-400">
              {totalCommitsThisYear.toLocaleString()}
            </p>
          </div>

          {topLanguages.length > 0 && (
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-mono mb-2">
                Top languages
              </p>
              <div className="flex flex-wrap gap-2">
                {topLanguages.map((lang) => (
                  <span
                    key={lang.name}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/40 px-3 py-1 text-[11px] font-mono text-muted-foreground bg-background/60"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          lang.color || "rgba(34,197,94,0.9)",
                      }}
                    />
                    <span className="text-foreground">{lang.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {mostActiveRepo && (
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-mono mb-1">
                Most active repo
              </p>
              <a
                href={mostActiveRepo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col rounded-lg border border-primary/40 bg-background/40 px-3 py-2 hover:border-green-400/80 hover:bg-background/70 transition-colors"
              >
                <span className="text-sm font-mono text-foreground">
                  {mostActiveRepo.name}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono mt-1">
                  {mostActiveRepo.primaryLanguage?.name ?? "Code"} •{" "}
                  {mostActiveRepo.stargazerCount}★
                </span>
              </a>
            </div>
          )}
        </div>

        {/* Right: heatmap */}
        <div className="space-y-4">
          <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] overflow-x-auto pb-2">
            {days.map((day) => (
              <div
                key={day.date}
                className="flex flex-col gap-[3px]"
                aria-hidden="true"
              >
                <div
                  className="w-[9px] h-[9px] rounded-[3px]"
                  style={{
                    backgroundColor:
                      day.contributionCount === 0
                        ? "rgba(34,197,94,0.14)"
                        : day.color || "rgb(34,197,94)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground font-mono">
            <span>less</span>
            <div className="flex items-center gap-1">
              {[0.2, 0.4, 0.7, 1].map((opacity) => (
                <span
                  key={opacity}
                  className="w-3 h-3 rounded-[3px]"
                  style={{
                    backgroundColor: `rgba(34,197,94,${opacity})`,
                  }}
                />
              ))}
            </div>
            <span>more</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-[10px] md:text-xs text-muted-foreground font-mono">
        last updated: {new Date().toLocaleDateString()}
      </p>
    </section>
  );
}

type StatCardProps = {
  label: string;
  value: string | number;
  suffix?: string;
};

function StatCard({ label, value, suffix }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="border border-primary/30 rounded-lg bg-background/30 backdrop-blur-sm p-5"
    >
      <div className="text-3xl md:text-4xl font-bold text-green-400 font-mono mb-1">
        {value}
        {suffix && (
          <span className="text-sm text-muted-foreground ml-1">{suffix}</span>
        )}
      </div>
      <div className="text-xs md:text-sm font-mono text-muted-foreground uppercase tracking-wide">
        {label}
      </div>
    </motion.div>
  );
}

