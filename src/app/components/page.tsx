"use client";

import React from "react";
import { WaitlistForm } from "@/registry/components/waitlist-form";
import { WaitlistDialog } from "@/registry/components/waitlist-dialog";

import { AvatarStack } from "@/registry/components/avatar-stack";
import { StackedTestimonials } from "@/registry/components/stacked-testimonials";
import { FAQSection } from "@/registry/components/faq-section";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, Search, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const components = [
  {
    id: "avatar-stack",
    name: "Avatar Stack",
    description: "A simple, elegant avatar stack component with social proof and optional count.",
    component: <AvatarStack />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/avatar-stack.json"
  },
  {
    id: "waitlist-form",
    name: "Waitlist Form",
    description: "A sleek, animated email capture form with built-in validation and success states.",
    component: <WaitlistForm className="max-w-sm" onSubmitEmail={async () => { await new Promise(r => setTimeout(r, 1000)) }} />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/waitlist-form.json"
  },
  {
    id: "waitlist-dialog",
    name: "Waitlist Dialog",
    description: "A professional popup dialog for waitlist signup. Perfect for CTAs.",
    component: (
      <WaitlistDialog 
        buttonText="Get Early Access"
        title="Exclusive Early Access"
        description="Join our waitlist to receive updates and early access to new features."
        onSubmitEmail={async () => { await new Promise(r => setTimeout(r, 1000)) }}
      />
    ),
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/waitlist-dialog.json"
  },
  {
    id: "stacked-testimonials",
    name: "Stacked Testimonials",
    description: "A beautiful stacked card testimonial component with Framer Motion transitions.",
    component: <StackedTestimonials />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/stacked-testimonials.json"
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    description: "An animated, accordion-style FAQ component with Framer Motion.",
    component: <FAQSection />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/faq-section.json"
  },

];

export default function ComponentsPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredComponents = components.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-muted/30 border-b py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Components</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our collection of premium waitlist components. Copy the installation command to add them to your project.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container px-4 mx-auto h-16 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search components..." 
              className="pl-10 h-10 rounded-full bg-muted/50 border-none focus-visible:ring-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={viewMode === "grid" ? "outline" : "ghost"} 
              size="icon" 
              className="rounded-lg h-10 w-10"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "outline" : "ghost"} 
              size="icon" 
              className="rounded-lg h-10 w-10"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container px-4 mx-auto mt-12">
        <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-12" : "flex flex-col gap-12"}>
          {filteredComponents.map((comp) => (
            <div 
              key={comp.id}
              className="group"
            >
              <div className="relative bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-8 md:p-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{comp.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comp.description}
                    </p>
                  </div>

                  {/* Preview Area */}
                  <div className="bg-white rounded-2xl p-12 border border-dashed flex items-center justify-center min-h-[300px] mb-8">
                    {comp.component}
                  </div>

                  {/* Install Area */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Installation</p>
                    <div className="relative group/install">
                      <div className="flex items-center bg-muted/50 border rounded-xl px-4 py-3 font-mono text-xs overflow-hidden">
                        <Terminal className="w-3 h-3 mr-3 text-muted-foreground" />
                        <span className="truncate flex-1">{comp.install}</span>
                        <button 
                          onClick={() => copyToClipboard(comp.install, comp.id)}
                          className="ml-4 p-1.5 hover:bg-background rounded-md transition-colors"
                        >
                          {copied === comp.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-lg text-muted-foreground">No components found matching "{search}"</p>
            <Button variant="link" onClick={() => setSearch("")} className="mt-2">Clear search</Button>
          </div>
        )}
      </div>
    </main>
  );
}
