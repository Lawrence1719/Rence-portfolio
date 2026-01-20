"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { GitHubContributions } from "@/components/github-contributions";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after "connection established" completes (around 3.8 seconds)
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* CLI Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-primary/40 rounded-lg bg-background/40 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          {/* Window Header */}
          <div className="bg-linear-to-r from-primary/10 to-cyan-500/10 border-b border-primary/20 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-primary">
                <span className="text-green-400">&gt;</span> ~/portfolio
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="border-t border-primary/20"></div>

          {/* Terminal Content */}
          <div className="p-8 space-y-6">
            {/* Typewriter Lines */}
            <div className="space-y-2 font-mono text-sm">
              <div className="text-primary/80">
                <TypewriterEffect
                  text="$ initializing portfolio..."
                  delay={100}
                  speed={50}
                />
              </div>
              <div className="text-primary/80">
                <TypewriterEffect
                  text="$ loading profile data..."
                  delay={1200}
                  speed={50}
                />
              </div>
              <div className="text-primary">
                <TypewriterEffect
                  text="$ connection established"
                  delay={2400}
                  speed={50}
                />
              </div>
            </div>

            {/* Content revealed after connection established */}
            {showContent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 pt-4"
              >
                {/* Name Heading */}
                <div className="space-y-1">
                  <h1 className="text-5xl md:text-6xl font-mono font-bold">
                    <span className="text-green-400">&gt;</span>
                    <span className="text-foreground">Hello, I&apos;m </span>
                    <span className="text-cyan-400">Rence</span>
                  </h1>
                  <p className="text-base font-mono text-muted-foreground ml-8">
                    Aspiring Full-Stack Developer | IT Student | Web Dev
                    Enthusiast
                  </p>
                </div>

                {/* Bio Lines */}
                <div className="space-y-2 font-mono text-sm text-muted-foreground ml-8">
                  <div className="text-primary">
                    <span className="text-green-400">$</span> I build elegant
                    digital experiences with clean code
                  </div>
                  <div className="text-primary">
                    <span className="text-green-400">$</span> Passionate about
                    creating seamless user interfaces
                  </div>
                  <div className="text-primary">
                    <span className="text-green-400">$</span> Always learning,
                    always building
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 ml-8">
                  <Link
                    href="/projects"
                    className="px-6 py-3 bg-green-400 text-black font-mono font-semibold rounded-lg hover:bg-green-300 transition-all hover:shadow-lg hover:shadow-green-400/50 text-sm flex items-center gap-2 group w-fit"
                  >
                    View Projects
                    <span className="text-lg">›</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-green-400 text-green-400 font-mono font-semibold rounded-lg hover:bg-green-400/10 transition-all text-sm flex items-center gap-2 w-fit"
                  >
                    Get in Touch
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Stat Card 1 */}
            <div className="border border-green-400/40 rounded-lg bg-background/30 backdrop-blur-sm p-8 text-center hover:border-green-400/70 transition-colors">
              <div className="text-4xl md:text-5xl font-bold text-green-400 font-mono mb-2">
                10k+
              </div>
              <div className="text-sm md:text-base font-mono text-muted-foreground">
                Lines of Code
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="border border-green-400/40 rounded-lg bg-background/30 backdrop-blur-sm p-8 text-center hover:border-green-400/70 transition-colors">
              <div className="text-4xl md:text-5xl font-bold text-green-400 font-mono mb-2">
                2
              </div>
              <div className="text-sm md:text-base font-mono text-muted-foreground">
                Projects
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="border border-green-400/40 rounded-lg bg-background/30 backdrop-blur-sm p-8 text-center hover:border-green-400/70 transition-colors">
              {" "}
              <div className="text-4xl md:text-5xl font-bold text-green-400 font-mono mb-2">
                ∞
              </div>{" "}
              <div className="text-sm md:text-base font-mono text-muted-foreground">
                Coffee Cups
              </div>{" "}
            </div>
          </motion.div>
        )}

        {showContent && (
          <GitHubContributions username="Lawrence1719" />
        )}
      </div>
    </div>
  );
}

