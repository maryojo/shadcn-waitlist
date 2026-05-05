"use client";

import React from "react";
import { WaitlistForm } from "@/registry/components/waitlist-form";
import { SocialProofTicker } from "@/components/social-proof-ticker";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, GitBranch, Sparkles, Zap, Shield, ArrowRight, MousePointer2, Layers, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

import { ShadcnIcon, ReactIcon, TailwindIcon, TypeScriptIcon, FramerMotionIcon, RadixUIIcon } from "@/components/brand-icons";

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const installCommand = "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/waitlist-form.json";

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-48 lg:pb-56">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8"
              >
                <span>v1.0 is now live</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-heading font-bold tracking-tighter mb-8 leading-[0.9]"
              >
                Waitlists <br />
                <span className="text-muted-foreground/50">made beautiful.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-xl"
              >
                Stop losing early adopters with boring forms. Add premium, high-converting waitlist components to your React apps in seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-16"
              >
                <Link href="/components">
                  <Button size="lg" className="h-14 text-black px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 group">
                    Browse Components
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl text-lg font-bold bg-background/50 backdrop-blur-sm border-muted-foreground/20">
                  View on GitHub
                </Button>
              </motion.div>

              {/* Install CLI Pre-styled */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative group hidden sm:block"
              >
                <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3 font-medium px-1">
                  <Terminal className="w-4 h-4" />
                  <span>Install via shadcn CLI</span>
                </div>
                <div className="flex items-center bg-card/50 backdrop-blur-xl border border-muted-foreground/10 rounded-2xl p-2 pl-5 max-w-lg">
                  <code className="flex-1 font-mono text-xs md:text-sm truncate">
                    {installCommand}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(installCommand, "hero")}
                    className="ml-4 p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
                  >
                    {copied === "hero" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-primary" />}
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
                <SocialProofTicker className="relative z-10 w-full max-w-[320px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 border-t bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tighter">Why developers love us</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We've obsessed over every pixel and every line of code so you don't have to.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Layers, 
                title: "Copy-Paste Simplicity", 
                desc: "No complex installations. Just copy the code or use the CLI to add components to your project." 
              },
              { 
                icon: MousePointer2, 
                title: "Fully Interactive", 
                desc: "Every component comes with built-in states for loading, success, and validation." 
              },
              { 
                icon: Cpu, 
                title: "Framework Ready", 
                desc: "Works perfectly with Next.js, Vite, and Remix. Built with modern React 19 standards." 
              },
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-card border border-muted-foreground/10 p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Trusted By */}
      <section className="py-24 border-t overflow-hidden relative">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-12">Built with the best stack</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-3">
               <ShadcnIcon className="w-8 h-8" />
               <span className="text-2xl font-bold tracking-tighter">shadcn</span>
             </div>
             <div className="flex items-center gap-3">
               <ReactIcon className="w-8 h-8" />
               <span className="text-2xl font-bold tracking-tighter">React</span>
             </div>
             <div className="flex items-center gap-3">
               <TailwindIcon className="w-8 h-8" />
               <span className="text-2xl font-bold tracking-tighter">Tailwind CSS</span>
             </div>
             <div className="flex items-center gap-3">
               <FramerMotionIcon className="w-8 h-8" />
               <span className="text-2xl font-bold tracking-tighter">Framer Motion</span>
             </div>
             <div className="flex items-center gap-3">
               <RadixUIIcon className="w-8 h-8" />
               <span className="text-2xl font-bold tracking-tighter">Radix UI</span>
             </div>
             <div className="flex items-center gap-3">
               <TypeScriptIcon className="w-8 h-8" />
               <span className="text-2xl font-bold tracking-tighter">TypeScript</span>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container px-4 mx-auto">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-black  relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 tracking-tighter">Ready to start capturing leads?</h2>
              <p className="text-xl md:text-2xl mb-12 text-primary-foreground/80 leading-relaxed">
                Join thousands of developers using shadcn/waitlist to grow their products.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/components">
                  <Button size="lg" variant="secondary" className="h-16 px-12 rounded-2xl text-xl font-bold shadow-xl">
                    View All Components
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-xl font-bold border-white/20 bg-white/10 hover:bg-white/20 text-white">
                    Read Docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t bg-muted/10">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-xs">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-heading font-bold text-xl md:text-2xl tracking-tighter">shadcn/waitlist</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Crafting the web's most beautiful waitlist components. Built for performance and conversion.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Product</h4>
                <ul className="space-y-4 text-muted-foreground font-medium">
                  <li><Link href="/components" className="hover:text-primary transition-colors">Components</Link></li>
                  <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                  <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Community</h4>
                <ul className="space-y-4 text-muted-foreground font-medium">
                  <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Legal</h4>
                <ul className="space-y-4 text-muted-foreground font-medium">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-muted-foreground/10 flex flex-col sm:row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground font-medium">
              &copy; {new Date().getFullYear()} Built by Mary.
            </p>
            <div className="flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><GitBranch className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
