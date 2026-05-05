"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { AvatarStack } from "./avatar-stack";

export interface WaitlistFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  onSubmitEmail?: (email: string) => Promise<void>;
  successMessage?: string;
  buttonText?: string;
}

export function WaitlistForm({
  className,
  onSubmitEmail,
  successMessage = "You've been added to our early access list!",
  buttonText = "Join Waitlist",
  ...props
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      if (onSubmitEmail) {
        await onSubmitEmail(email);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setIsSuccess(true);
      setEmail("");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-2 rounded-[2rem] border border-black/5 shadow-2xl shadow-black/5", className)}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center space-y-4 text-center p-8 bg-white border border-black/5 rounded-[1.5rem]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
            <div className="space-y-1">
              <h3 className="font-bold text-xl tracking-tight">Success!</h3>
              <p className="text-muted-foreground">{successMessage}</p>
            </div>
            <Button 
              onClick={() => setIsSuccess(false)} 
              className="mt-2 rounded-full px-6 bg-black text-white hover:bg-black/90 transition-all active:scale-[0.97]"
            >
              Submit another email
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit}
            noValidate
            {...props}
          >
            <div className="flex items-center gap-3 px-1 mb-2">
              <AvatarStack />
              <p className="text-[11px] text-muted-foreground font-medium">
                Join <span className="text-black font-bold">2,431+</span> people already on the list
              </p>
            </div>
            <div className="relative group">
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              <div className="relative flex items-center">
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                  className={cn(
                    "h-12 pl-4 pr-[130px] rounded-xl border-black/10 bg-white focus-visible:ring-black/5 focus-visible:border-black transition-all duration-300",
                    error && "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                  )}
                />
                <div className="absolute inset-0 rounded-xl bg-black/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300" />
                <Button 
                  type="submit"
                  disabled={isLoading} 
                  className="absolute right-1 top-1 bottom-1 h-auto px-4 rounded-[10px] font-semibold bg-black text-white hover:bg-black/90 shadow-none transition-all duration-200 active:scale-[0.97]"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <div className="flex items-center">
                      <span className="hidden sm:inline">{buttonText}</span>
                      <span className="sm:hidden">Join</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[11px] text-red-500 font-medium px-1"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
            <p className="text-[10px] text-center text-muted-foreground">
              By joining, you agree to our <a href="#" className="underline underline-offset-2 hover:text-primary">Terms of Service</a>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
