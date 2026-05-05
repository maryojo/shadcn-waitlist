"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAMES = [
  "Alex", "Jordan", "Sam", "Charlie", "Taylor", "Morgan", "Casey", "Riley", "Skyler", "Quinn",
  "Avery", "Blake", "Dakota", "Emerson", "Finley", "Hayden", "Jamie", "Kendall", "Parker", "Reese"
];

const EMOJIS = ["🚀", "🔥", "✨", "🎉", "💎", "👾", "⚡️", "🌟", "❤️", "🙌", "🌈", "🦄"];

const ACTIONS = [
  "just joined the waitlist",
  "secured early access",
  "became a founder",
  "got in line",
  "is ready to build",
  "unlocked a beta invite",
  "joined the community",
  "is now on board"
];

interface Signup {
  id: number;
  name: string;
  emoji: string;
  action: string;
  timestamp: Date;
}

export function SocialProofTicker({ className }: { className?: string }) {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [nextId, setNextId] = useState(0);

  const addSignup = useCallback(() => {
    const newSignup: Signup = {
      id: nextId,
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
      timestamp: new Date(),
    };

    setSignups((prev) => [newSignup, ...prev].slice(0, 3));
    setNextId((id) => id + 1);
  }, [nextId]);

  useEffect(() => {
    // Initial signups
    for (let i = 0; i < 2; i++) {
      addSignup();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      addSignup();
    }, 3200);

    return () => clearInterval(interval);
  }, [addSignup]);

  return (
    <div className={cn("flex flex-col gap-2 overflow-hidden h-[120px] pointer-events-none select-none", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        {signups.map((signup, index) => (
          <motion.div
            key={signup.id}
            layout
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1 - index * 0.3, 
              x: 0, 
              filter: "blur(0px)",
              scale: 1 - index * 0.05
            }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              mass: 1,
              opacity: { duration: 0.2 },
              layout: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
            }}
            className="flex items-center gap-3 px-4 py-2 bg-card/50 backdrop-blur-md border border-muted-foreground/10 rounded-2xl shadow-sm"
          >
            <span className="text-xl">{signup.emoji}</span>
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">
                <span className="font-bold text-foreground">{signup.name}</span>{" "}
                <span className="text-muted-foreground">{signup.action}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
