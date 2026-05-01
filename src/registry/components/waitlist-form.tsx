"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center space-y-4 text-center p-8 bg-primary/5 border border-primary/20 rounded-2xl backdrop-blur-sm"
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
              variant="outline" 
              size="sm"
              onClick={() => setIsSuccess(false)} 
              className="mt-2 rounded-full px-6"
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
          >
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit}
              {...props}
            >
              <div className="relative group">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 px-4 rounded-xl border-muted-foreground/20 focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300" />
                </div>
              </div>
              <Button 
                disabled={isLoading} 
                className="h-12 rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {buttonText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground">
                By joining, you agree to our <a href="#" className="underline underline-offset-2 hover:text-primary">Terms of Service</a>.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
