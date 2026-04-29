"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WaitlistForm } from "./waitlist-form";
// import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface WaitlistDialogProps {
  buttonText?: string;
  title?: string;
  description?: string;
  successMessage?: string;
  onSubmitEmail?: (email: string) => Promise<void>;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showIcon?: boolean;
}

export function WaitlistDialog({
  buttonText = "Join Waitlist",
  title = "Get Early Access",
  description = "Be the first to know when we launch. Join over 1,000+ others already on the list.",
  successMessage,
  onSubmitEmail,
  buttonVariant = "default",
  showIcon = true,
}: WaitlistDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          <Button 
            variant={buttonVariant} 
            className="rounded-xl px-6 h-11 font-medium transition-all duration-300 active:scale-95"
          />
        }
      >
        {showIcon && <Sparkles className="mr-2 h-4 w-4" />}
        {buttonText}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="relative p-8 pt-10">
          <DialogHeader className="space-y-3 mb-6">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-balance">
              {description}
            </DialogDescription>
          </DialogHeader>
          <WaitlistForm 
            className="w-full" 
            onSubmitEmail={async (email) => {
              if (onSubmitEmail) await onSubmitEmail(email);
              // We don't automatically close so they see the success state
            }}
            successMessage={successMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
