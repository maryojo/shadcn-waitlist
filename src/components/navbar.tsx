"use client";

import Link from "next/link";
import Image from "next/image";
import { GitBranch, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image 
              src="/waitlist-logo.svg" 
              alt="Waitlist Logo" 
              width={32} 
              height={32} 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-heading font-bold text-xl tracking-tighter">shadcn/waitlist</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-y-0 space-x-8">
          <Link href="/components" className="text-sm font-medium hover:text-primary transition-colors">
            Components
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
            Documentation
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
            <GitBranch className="w-4 h-4" />
          </a>
          <Button size="sm" className="rounded-full px-5" >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b bg-background"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              <Link href="/components" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                Components
              </Link>
              <Link href="/docs" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                Documentation
              </Link>
              <a href="https://github.com" className="text-lg font-medium">
                GitHub
              </a>
              <Button className="w-full rounded-xl">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
