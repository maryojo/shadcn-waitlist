import React from "react";
import { WaitlistForm } from "@/registry/components/waitlist-form";
import { WaitlistDialog } from "@/registry/components/waitlist-dialog";
import { AvatarStack } from "@/registry/components/avatar-stack";
import { StackedTestimonials } from "@/registry/components/stacked-testimonials";
import { FAQSection } from "@/registry/components/faq-section";
import { WaitlistProgress } from "@/registry/components/waitlist-progress";

export type ComponentEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ReactNode;
  install: string;
};

export const components: ComponentEntry[] = [
  {
    id: "avatar-stack",
    name: "Avatar Stack",
    category: "Social Proof",
    description: "A simple, elegant avatar stack component with social proof and optional count.",
    component: <AvatarStack />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/avatar-stack.json"
  },
  {
    id: "waitlist-form",
    name: "Waitlist Form",
    category: "Forms",
    description: "A sleek, animated email capture form with built-in validation and success states.",
    component: <WaitlistForm className="max-w-sm" onSubmitEmail={async () => { await new Promise(r => setTimeout(r, 1000)) }} />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/waitlist-form.json"
  },
  {
    id: "waitlist-dialog",
    name: "Waitlist Dialog",
    category: "Overlays",
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
    category: "Social Proof",
    description: "A beautiful stacked card testimonial component with Framer Motion transitions.",
    component: <StackedTestimonials />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/stacked-testimonials.json"
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    category: "Content",
    description: "An animated, accordion-style FAQ component with Framer Motion.",
    component: <FAQSection />,
    install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/faq-section.json"
  },
  // {
  //   id: "waitlist-progress",
  //   name: "Waitlist Progress",
  //   category: "Progress",
  //   description: "An animated progress tracker to show signup goals and spots remaining.",
  //   component: <WaitlistProgress className="relative w-full" currentSignups={842} targetSignups={1000} />,
  //   install: "npx shadcn@latest add https://shadcn-waitlist.vercel.app/r/waitlist-progress.json"
  // },
];
