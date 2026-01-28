"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Terminal as TerminalIcon, Eraser } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types/project";

type OutputLine = { type: "input"; text: string } | { type: "output"; content: React.ReactNode };

const BIO = `rence
---
Aspiring Full-Stack Developer | IT Student | Web Dev Enthusiast

I build elegant digital experiences with clean code.
Passionate about creating seamless user interfaces.
Always learning, always building.

→ /about for more`;

const STACK = `Frontend:    React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
Backend:     Node.js, Express.js, Supabase, PostgreSQL, REST APIs, JWT, PHP, Laravel
Languages:   JavaScript, TypeScript, Python, Java, C++, PHP
Tools:       Git, Vite, Vercel, React Hook Form, Zod, Axios`;

const EXPERIENCE = `2024 - Present  Student Developer
             @ Never Stop Dreaming Trading (Capstone Project)
             Building a full-stack IoT-powered inventory and e-commerce system
             using React, TypeScript, Tailwind CSS, Supabase, Node.js, Express.

2023 - 2024   Personal Projects
             @ Self-Learning Journey
             Created and deployed web apps: CalculaStats, ArraySort visualizer
             using React, TypeScript, Vite, and modern web technologies.`;

type GitHubStats = {
  username: string;
  totalContributions: number;
  dailyAverage: number;
  currentStreak: number;
  totalCommitsThisYear: number;
  topLanguages: { name: string; color: string | null }[];
  mostActiveRepo: { name: string; url: string } | null;
};

function Brewing() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : `${d}.`));
    }, 350);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="text-green-400">
      Brewing{dots} <span className="text-muted-foreground">☕</span>
    </span>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let raf = 0;
    let last = 0;
    const fontSize = 14;
    const chars = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };
    resize();

    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(0);

    const onResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(0);
    };
    window.addEventListener("resize", onResize);

    const draw = (time: number) => {
      if (time - last < 50) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = time;

      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle = "rgba(34, 197, 94, 0.95)";
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md border border-primary/30 bg-black/60">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent to-black/40" />
    </div>
  );
}

function Terminal({
  isInModal,
  onExit,
  onTitleBarMouseDown,
}: {
  isInModal?: boolean;
  onExit?: () => void;
  onTitleBarMouseDown?: (e: React.MouseEvent) => void;
}) {
  const [lines, setLines] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [shake, setShake] = useState(false);
  const [secretTheme, setSecretTheme] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();
  const router = useRouter();
  const konamiIndexRef = useRef(0);

  // Apply/remove secret theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("konami-theme", secretTheme);
    return () => {
      root.classList.remove("konami-theme");
    };
  }, [secretTheme]);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  // Focus input when terminal mounts (e.g. when modal opens)
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const appendOutput = useCallback((content: React.ReactNode) => {
    setLines((prev) => [...prev, { type: "output", content }]);
  }, []);

  const triggerShake = useCallback(() => {
    setShake(true);
    window.setTimeout(() => setShake(false), 650);
  }, []);

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const seq = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a",
      ];

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = seq[konamiIndexRef.current];
      if (key === expected) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current >= seq.length) {
          konamiIndexRef.current = 0;
          setSecretTheme((v) => !v);
          appendOutput(
            <span className="text-green-400">
              Konami code accepted. {secretTheme ? "Secret theme disabled." : "Secret theme unlocked."}
            </span>,
          );
        }
      } else {
        konamiIndexRef.current = 0;
      }
    },
    [appendOutput, secretTheme],
  );

  const runCommand = useCallback(
    async (cmd: string): Promise<React.ReactNode> => {
      const trimmed = cmd.trim().toLowerCase();
      const parts = trimmed.split(/\s+/);
      const base = parts[0] ?? "";

      // Easter egg: don't do this at home
      if (trimmed === "sudo rm -rf /") {
        triggerShake();
        return (
          <pre className="text-red-400 font-mono text-xs whitespace-pre-wrap">
            {`⚠️  nice try.
permission denied: /dev/portfolio
hint: try \"hack\" or the konami code`}
          </pre>
        );
      }

      if (base === "help" || base === "?") {
        return (
          <pre className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">
            {`whoami        → Your bio
stack         → Tech stack
projects      → Fetch from Supabase
experience    → Your journey
theme dark    → Dark mode
theme light   → Light mode
stats         → GitHub stats (live)
chat          → Chatbot mode
clear, cls    → Clear terminal
exit, quit    → Close terminal
help          → This menu`}
          </pre>
        );
      }

      if (base === "clear" || base === "cls") {
        setLines([]);
        return null;
      }

      if (base === "exit" || base === "quit") {
        onExit?.();
        return null;
      }

      // Hidden command (not listed in help)
      if (base === "login") {
        onExit?.();
        router.push("/login");
        return null;
      }

      // Easter eggs (kept off the help list)
      if (base === "coffee") {
        return <Brewing />;
      }

      if (base === "hack") {
        triggerShake();
        return (
          <div className="space-y-2">
            <span className="text-green-400">Access granted. Rendering Matrix…</span>
            <MatrixRain />
          </div>
        );
      }

      if (base === "whoami") {
        return <pre className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">{BIO}</pre>;
      }

      if (base === "stack") {
        return <pre className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">{STACK}</pre>;
      }

      if (base === "experience") {
        return <pre className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">{EXPERIENCE}</pre>;
      }

      if (base === "theme") {
        const mode = parts[1];
        if (mode === "dark") {
          setTheme("dark");
          return <span className="text-green-400">Switched to dark mode.</span>;
        }
        if (mode === "light") {
          setTheme("light");
          return <span className="text-green-400">Switched to light mode.</span>;
        }
        return <span className="text-amber-400">Usage: theme dark | theme light</span>;
      }

      if (base === "chat") {
        setChatMode((c) => !c);
        return (
          <span className="text-green-400">
            {chatMode ? "Chat mode deactivated." : "Chat mode activated. (Coming soon: AI assistant!)"}
          </span>
        );
      }

      if (base === "projects") {
        setLoading(true);
        try {
          const res = await fetch("/api/projects");
          const data = (await res.json()) as Project[] | { error?: string };
          if (!res.ok || Array.isArray(data) === false) {
            const err = Array.isArray(data) ? "Failed to fetch" : (data as { error?: string }).error;
            return <span className="text-red-400">{err ?? "Failed to fetch projects."}</span>;
          }
          const list = data as Project[];
          if (list.length === 0) {
            return <span className="text-muted-foreground">No projects yet.</span>;
          }
          return (
            <pre className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">
              {list
                .map(
                  (p) =>
                    `• ${p.title} [${p.status}]\n  ${p.description}\n  → /projects`
                )
                .join("\n\n")}
            </pre>
          );
        } catch (e) {
          return <span className="text-red-400">Error fetching projects.</span>;
        } finally {
          setLoading(false);
        }
      }

      if (base === "stats") {
        setLoading(true);
        try {
          const res = await fetch("/api/github-contributions?username=Lawrence1719");
          const data = (await res.json()) as GitHubStats | { error?: string };
          if (!res.ok || "error" in data) {
            const err = (data as { error?: string }).error;
            return <span className="text-red-400">{err ?? "Failed to fetch GitHub stats."}</span>;
          }
          const s = data as GitHubStats;
          const langList = s.topLanguages.map((l) => l.name).join(", ");
          return (
            <pre className="text-muted-foreground font-mono text-xs whitespace-pre-wrap">
              {`@${s.username}
contributions: ${s.totalContributions}
streak:        ${s.currentStreak} days
daily avg:     ${s.dailyAverage}
commits:       ${s.totalCommitsThisYear}
top langs:     ${langList}
active repo:   ${s.mostActiveRepo?.name ?? "—"}`}
            </pre>
          );
        } catch (e) {
          return <span className="text-red-400">Error fetching GitHub stats.</span>;
        } finally {
          setLoading(false);
        }
      }

      if (!trimmed) return null;
      return <span className="text-amber-400">Unknown command: {cmd.trim()}. Type &apos;help&apos; for commands.</span>;
    },
    [setTheme, chatMode, onExit, router, triggerShake]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const raw = input.trim();
      setInput("");
      if (!raw) return;

      setLines((prev) => [...prev, { type: "input", text: raw }]);
      const out = await runCommand(raw);
      if (out !== null) {
        setLines((prev) => [...prev, { type: "output", content: out }]);
      }
    },
    [input, runCommand]
  );

  const handleClear = useCallback(() => setLines([]), []);

  return (
    <div
      className={cn(
        "flex flex-col h-full min-h-0 max-h-full",
        isInModal && "min-h-[400px]",
        shake && "terminal-shake",
      )}
    >
      {/* Toolbar: draggable title bar + clear button */}
      <div
        className="flex items-center justify-between border-b border-border pl-3 pr-12 py-2 bg-muted/50 shrink-0 cursor-move select-none"
        onMouseDown={onTitleBarMouseDown}
      >
        <span className="text-xs font-mono text-muted-foreground">
          <span className="text-green-400">&gt;</span> ~/portfolio
        </span>
        <div className="flex items-center gap-2 cursor-default" onMouseDown={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground font-mono text-xs cursor-default"
            onClick={handleClear}
            aria-label="Clear terminal"
          >
            <Eraser className="w-3.5 h-3.5" />
            Clear
          </Button>
        </div>
      </div>

      {/* Output + input */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 font-mono text-sm space-y-2"
      >
        {lines.map((line, i) => (
          <div key={i} className="space-y-1">
            {line.type === "input" && (
              <div>
                <span className="text-green-400">$</span>{" "}
                <span className="text-foreground">{line.text}</span>
              </div>
            )}
            {line.type === "output" && (
              <div className="text-muted-foreground pl-1">{line.content}</div>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onInputKeyDown}
            disabled={loading}
            placeholder={loading ? "Loading..." : "Enter command (help for list)"}
            className="flex-1 min-w-0 bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-60"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}

import { createPortal } from "react-dom";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

// ... (Terminal component remains the same, we simply reuse it)

export function TerminalModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dragControls = useDragControls();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  const onTitleBarPointerDown = useCallback(
    (e: React.PointerEvent | React.MouseEvent) => {
      // @ts-ignore - Framer motion types can be strict, but passing the React event works
      dragControls.start(e);
    },
    [dragControls]
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Draggable Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag
              dragControls={dragControls}
              dragListener={false} // Only drag when controls are started
              dragMomentum={false} // Prevents "sliding" after release, feels more like a window
              dragElastic={0.1}
              // pointer-events-auto needed because parent is pointer-events-none (to allow clicking through to backdrop)
              className="pointer-events-auto relative w-[min(95vw,1100px)] max-h-[85vh] flex flex-col rounded-lg border bg-background shadow-lg overflow-hidden"
            >
              <Terminal
                isInModal
                onExit={() => onOpenChange(false)}
                // We pass our handler to the TitleBar's onMouseDown prop.
                // Note: Terminal uses onMouseDown, but framer controls start with PointerEvent or MouseEvent.
                // We cast or standardise in the handler.
                onTitleBarMouseDown={onTitleBarPointerDown}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function TerminalFloatingButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-background/90 backdrop-blur-md shadow-lg hover:border-primary/70 hover:bg-primary/10 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
        aria-label="Open terminal"
      >
        <TerminalIcon className="h-6 w-6 text-primary" />
      </button>
      <TerminalModal open={open} onOpenChange={setOpen} />
    </>
  );
}
