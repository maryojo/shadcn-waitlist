"use client";

import React from "react";
import { WaitlistForm } from "@/registry/components/waitlist-form";
import { WaitlistDialog } from "@/registry/components/waitlist-dialog";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, GitBranch, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const installCommand = "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/waitlist-form.json";

  return (
    <main className="min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,var(--color-primary)_0%,transparent_100%)] opacity-5" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-background shadow-xl shadow-primary/10 ring-1 ring-primary/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>Beautiful Waitlist Components for Shadcn UI</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70"
            >
              Capture Every Lead with Style
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Ready-to-use, customizable waitlist forms and dialogs built with React, Tailwind CSS, and Framer Motion. Fully compatible with shadcn/ui.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-foreground rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-card border rounded-xl px-4 py-3 font-mono text-sm overflow-hidden">
                  <Terminal className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{installCommand}</span>
                  <button 
                    onClick={() => copyToClipboard(installCommand, "hero")}
                    className="ml-4 p-1 hover:bg-muted rounded transition-colors"
                  >
                    {copied === "hero" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              <Button size="lg" className="rounded-xl h-12 px-8 font-semibold shadow-lg shadow-primary/20">
                Explore Components
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Components Preview */}
      <section className="py-24 bg-muted/30 relative">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Inline Form Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Inline Form</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A clean, focused waitlist form perfect for landing pages and hero sections. Includes built-in validation and success states.
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-2xl p-8 border border-dashed flex items-center justify-center min-h-[300px]">
                  <WaitlistForm 
                    className="max-w-sm"
                    onSubmitEmail={async (email) => {
                      console.log("Submitted email:", email);
                      await new Promise(r => setTimeout(r, 1500));
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Dialog Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card border rounded-3xl p-8 md:p-12 shadow-sm h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Dialog Component</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    An elegant popup trigger for waitlist capture. Ideal for &quot;Join Waitlist&quot; buttons in navbars or footers.
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-2xl p-8 border border-dashed flex-1 flex flex-col items-center justify-center space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4 font-medium uppercase tracking-widest">Live Demo</p>
                    <WaitlistDialog 
                      buttonText="Join the Waitlist"
                      title="Limited Spots Available"
                      description="Join our exclusive early access list and be the first to experience the future."
                      onSubmitEmail={async (email) => {
                        console.log("Submitted email via dialog:", email);
                        await new Promise(r => setTimeout(r, 1500));
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">Why choose our waitlist?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Zap, 
                title: "Blazing Fast", 
                desc: "Optimized for performance with zero layout shift and lightweight animations." 
              },
              { 
                icon: Shield, 
                title: "Shadcn Native", 
                desc: "Follows shadcn/ui patterns. Fully typed and easy to customize with CSS variables." 
              },
              { 
                icon: Sparkles, 
                title: "Premium Motion", 
                desc: "Smooth AnimatePresence transitions and spring physics for a premium feel." 
              },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-muted/30">
        <div className="container px-4 mx-auto flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">shadcn/waitlist</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}Open sourced on GitHub.
          </p>
          <div className="flex items-center space-x-6 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors"><GitBranch className="w-5 h-5" /></a>
            <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="#" className="hover:text-foreground transition-colors">Components</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
