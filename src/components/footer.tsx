import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GitBranch } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-24 border-t bg-muted/10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16 mb-24 text-center md:text-left">
          <div className="max-w-xs flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image 
                  src="/waitlist-logo.svg" 
                  alt="Waitlist Logo" 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-contain"
                />
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
                {/* <li><Link href="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest">Community</h4>
              <ul className="space-y-4 text-muted-foreground font-medium">
                <li><a href="https://github.com/maryojo/shadcn-waitlist" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-muted-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <p className="text-sm text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Built with care by Mary Ojo.
          </p>
          <div className="flex items-center space-x-8">
            <a href="https://github.com/maryojo/shadcn-waitlist" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest">Open Source</span>
              <GitBranch className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
