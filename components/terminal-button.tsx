"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TerminalModal } from "./terminal";

export function TerminalButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="ml-2 px-3 py-2 rounded text-sm font-mono transition-all text-muted-foreground hover:text-green-400 hover:bg-green-400/10 hover:border-green-400/50 border border-transparent focus:outline-none focus:ring-2 focus:ring-green-400/50 terminal-button-glow"
        aria-label="Open terminal"
        title="Open terminal (~ or ` or Ctrl+`)"
      >
        <span className="inline-flex items-center gap-1">
          <span className="text-green-400">&gt;</span>
          <span>_</span>
        </span>
      </motion.button>
      <TerminalModal open={open} onOpenChange={setOpen} />
    </>
  );
}
