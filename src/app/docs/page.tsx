"use client";

import React, { useState } from "react";
import { docEntries, type DocEntry } from "@/app/components/data";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Terminal, ChevronRight, BookOpen, Puzzle, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";


function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className={cn(
        "p-1.5 rounded-md hover:bg-white/10 transition-colors",
        className
      )}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <div className="relative group rounded-xl overflow-hidden border border-muted-foreground/10 bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-2 border-b border-muted-foreground/10">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm font-mono text-zinc-300 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function InstallBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-3 bg-muted/50 border border-muted-foreground/10 rounded-xl px-4 py-3">
      <Terminal className="w-4 h-4 text-muted-foreground shrink-0" />
      <code className="flex-1 text-sm font-mono truncate">{command}</code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="p-1.5 hover:bg-background rounded-md transition-colors"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

function PropsTable({ props }: { props: DocEntry["props"] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-muted-foreground/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted-foreground/10 bg-muted/30">
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Prop</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Type</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Default</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase text-xs tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-b border-muted-foreground/5 last:border-0",
                i % 2 === 0 ? "bg-transparent" : "bg-muted/10"
              )}
            >
              <td className="px-4 py-3 font-mono text-primary text-xs">
                {prop.name}
                {prop.required && (
                  <span className="ml-1 text-red-400 font-bold">*</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground max-w-[200px]">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground leading-relaxed">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocSection({ entry }: { entry: DocEntry }) {
  return (
    <div className="py-2">
      <h2 className="text-2xl font-bold tracking-tight mb-2">{entry.name}</h2>
      <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">{entry.description}</p>

      <div className="space-y-8">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Installation</h3>
          <InstallBlock command={entry.install} />
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Usage</h3>
          <CodeBlock code={entry.usage} />
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Props</h3>
          <PropsTable props={entry.props} />
          {entry.props.some(p => p.required) && (
            <p className="mt-2 text-xs text-muted-foreground">
              <span className="text-red-400 font-bold">*</span> Required
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState(docEntries[0]?.id ?? "");

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-muted/30 border-b py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Documentation</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Getting Started</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              All components are open source and free to use. Install them via the shadcn CLI or copy the source directly.
            </p>
          </div>
        </div>
      </div>

      {/* Prerequisites banner */}
      <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container px-4 mx-auto py-4 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Package className="w-4 h-4 text-primary" />
            <span>Prerequisites:</span>
          </div>
          {["shadcn/ui", "framer-motion", "lucide-react"].map(pkg => (
            <code key={pkg} className="text-xs bg-muted border border-muted-foreground/10 px-2.5 py-1 rounded-md font-mono">
              {pkg}
            </code>
          ))}
        </div>
      </div>

      <div className="container px-4 mx-auto mt-12">
        <div className="flex gap-16 relative">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-3">
                Components
              </p>
              <nav className="space-y-1">
                {docEntries.map((entry) => (
                  <button
                    key={entry.id}
                    onClick={() => setActiveId(entry.id)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left",
                      activeId === entry.id
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Puzzle className="w-3.5 h-3.5 shrink-0" />
                    {entry.name}
                    {activeId === entry.id && (
                      <ChevronRight className="w-3 h-3 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content — one component at a time */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {docEntries
                .filter((e) => e.id === activeId)
                .map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <DocSection entry={entry} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

