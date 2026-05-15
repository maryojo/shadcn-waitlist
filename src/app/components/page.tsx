"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, Search, Filter, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { components } from "./data";
import { Footer } from "@/components/footer";



export default function ComponentsPage() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(components.map(c => c.category)))];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredComponents = components.filter(c => 
    (selectedCategory === "All" || c.category === selectedCategory) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-muted/30 border-b py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Components and Blocks</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore our collection of premium waitlist components and blocks. Copy the installation command to add them to your project.
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container px-4 py-5 md:py-0 md:mx-auto h-fit md:h-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search components and blocks..." 
              className="pl-10 h-10 rounded-full bg-muted/50 border-none focus-visible:ring-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center gap-2 overflow-x-auto md:pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full whitespace-nowrap"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-2">
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
        <div className={viewMode === "grid" ? "columns-1 lg:columns-2 gap-12 space-y-12" : "flex flex-col gap-12"}>
          {filteredComponents.map((comp) => (
            <div 
              key={comp.id}
              className="group break-inside-avoid"
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
                  <div className="bg-white rounded-2xl px-4 md:p-12 border border-dashed flex items-center justify-center min-h-[250px] md:min-h-[300px] mb-8">
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
            <p className="text-lg text-muted-foreground">No components or blocks found matching "{search}"</p>
            <Button variant="link" onClick={() => setSearch("")} className="mt-2">Clear search</Button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

