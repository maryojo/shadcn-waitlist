import React from "react";
import { WaitlistForm } from "@/registry/components/waitlist-form";
import { WaitlistDialog } from "@/registry/components/waitlist-dialog";
import { AvatarStack } from "@/registry/components/avatar-stack";
import { StackedTestimonials } from "@/registry/components/stacked-testimonials";
import { FAQSection } from "@/registry/components/faq-section";
// import { WaitlistProgress } from "@/registry/components/waitlist-progress";

export type ComponentEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ReactNode;
  install: string;
};

export type PropDef = {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
};

export type DocEntry = {
  id: string;
  name: string;
  description: string;
  install: string;
  usage: string;
  props: PropDef[];
};

export const components: ComponentEntry[] = [
  {
    id: "avatar-stack",
    name: "Avatar Stack",
    category: "Social Proof",
    description: "A simple, elegant avatar stack component with social proof and optional count.",
    component: <AvatarStack />,
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/avatar-stack.json"
  },
  {
    id: "waitlist-form",
    name: "Waitlist Form",
    category: "Forms",
    description: "A sleek, animated email capture form with built-in validation and success states.",
    component: <WaitlistForm className="max-w-sm" onSubmitEmail={async () => { await new Promise(r => setTimeout(r, 1000)) }} />,
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/waitlist-form.json"
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
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/waitlist-dialog.json"
  },
  {
    id: "stacked-testimonials",
    name: "Stacked Testimonials",
    category: "Social Proof",
    description: "A beautiful stacked card testimonial component with Framer Motion transitions.",
    component: <StackedTestimonials />,
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/stacked-testimonials.json"
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    category: "Content",
    description: "An animated, accordion-style FAQ component with Framer Motion.",
    component: <FAQSection />,
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/faq-section.json"
  },
  // {
  //   id: "waitlist-progress",
  //   name: "Waitlist Progress",
  //   category: "Progress",
  //   description: "An animated progress tracker to show signup goals and spots remaining.",
  //   component: <WaitlistProgress className="relative w-full" currentSignups={842} targetSignups={1000} />,
  //   install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/waitlist-progress.json"
  // },
];

export const docEntries: DocEntry[] = [
  {
    id: "avatar-stack",
    name: "Avatar Stack",
    description: "Displays a compact stack of overlapping user avatars with an optional overflow count, perfect for showing social proof.",
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/avatar-stack.json",
    usage: `import { AvatarStack } from "@/components/avatar-stack";

<AvatarStack
  avatars={[
    { src: "/avatars/1.png", alt: "Alice" },
    { src: "/avatars/2.png", alt: "Bob" },
  ]}
  count={120}
/>`,
    props: [
      { name: "avatars", type: "{ src: string; alt: string }[]", description: "Array of avatar image objects to display.", required: true },
      { name: "count", type: "number", description: "Total signup count shown next to the stack.", default: "undefined" },
      { name: "className", type: "string", description: "Additional CSS classes.", default: "undefined" },
    ],
  },
  {
    id: "waitlist-form",
    name: "Waitlist Form",
    description: "An animated email capture form with built-in loading, success, and validation states. Drop it anywhere on your page.",
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/waitlist-form.json",
    usage: `import { WaitlistForm } from "@/components/waitlist-form";

<WaitlistForm
  onSubmitEmail={async (email) => {
    await subscribeToWaitlist(email);
  }}
/>`,
    props: [
      { name: "onSubmitEmail", type: "(email: string) => Promise<void>", description: "Async handler called with the submitted email. Throw to trigger an error state.", required: true },
      { name: "placeholder", type: "string", description: "Input placeholder text.", default: "'Enter your email'" },
      { name: "buttonText", type: "string", description: "Submit button label.", default: "'Join Waitlist'" },
      { name: "className", type: "string", description: "Additional CSS classes.", default: "undefined" },
    ],
  },
  {
    id: "waitlist-dialog",
    name: "Waitlist Dialog",
    description: "A polished modal dialog that triggers from a button. Wraps WaitlistForm inside a shadcn Dialog for use as a CTA.",
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/waitlist-dialog.json",
    usage: `import { WaitlistDialog } from "@/components/waitlist-dialog";

<WaitlistDialog
  buttonText="Get Early Access"
  title="Join the Waitlist"
  description="Be first in line when we launch."
  onSubmitEmail={async (email) => {
    await subscribeToWaitlist(email);
  }}
/>`,
    props: [
      { name: "onSubmitEmail", type: "(email: string) => Promise<void>", description: "Async handler called with the submitted email.", required: true },
      { name: "buttonText", type: "string", description: "Label for the trigger button.", default: "'Join Waitlist'" },
      { name: "title", type: "string", description: "Dialog heading text.", default: "'Join the Waitlist'" },
      { name: "description", type: "string", description: "Subtext shown below the dialog title.", default: "undefined" },
    ],
  },
  {
    id: "stacked-testimonials",
    name: "Stacked Testimonials",
    description: "A drag-and-drop stack of testimonial cards with Framer Motion spring physics and auto-advance cycling.",
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/stacked-testimonials.json",
    usage: `import { StackedTestimonials } from "@/components/stacked-testimonials";

<StackedTestimonials
  testimonials={[
    {
      name: "Alice",
      role: "Founder @ Acme",
      content: "This saved us weeks of work!",
      avatar: "/avatars/alice.png",
    },
  ]}
/>`,
    props: [
      { name: "testimonials", type: "{ name: string; role: string; content: string; avatar?: string }[]", description: "Array of testimonial objects to display.", default: "Built-in demo data" },
      { name: "autoAdvanceMs", type: "number", description: "Milliseconds between auto-advance cycles.", default: "4000" },
      { name: "className", type: "string", description: "Additional CSS classes.", default: "undefined" },
    ],
  },
  {
    id: "faq-section",
    name: "FAQ Section",
    description: "An animated accordion FAQ list powered by Framer Motion. Each item expands smoothly with a spring transition.",
    install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/faq-section.json",
    usage: `import { FAQSection } from "@/components/faq-section";

<FAQSection
  items={[
    {
      question: "Is it free?",
      answer: "Yes, all components are free and open source.",
    },
  ]}
/>`,
    props: [
      { name: "items", type: "{ question: string; answer: string }[]", description: "List of FAQ items.", default: "Built-in demo data" },
      { name: "className", type: "string", description: "Additional CSS classes.", default: "undefined" },
    ],
  },
  // {
  //   id: "waitlist-progress",
  //   name: "Waitlist Progress",
  //   description: "A visual progress bar showing waitlist signups and milestones. Highly customizable with spring animations.",
  //   install: "npx shadcn@latest add https://shadcn-waitlist.netlify.app/r/waitlist-progress.json",
  //   usage: `import { WaitlistProgress } from "@/components/waitlist-progress";
  // 
  // <WaitlistProgress
  //   currentSignups={842}
  //   targetSignups={1000}
  //   milestones={[250, 500, 750]}
  // />`,
  //   props: [
  //     { name: "currentSignups", type: "number", description: "The current number of people who have joined.", default: "842" },
  //     { name: "targetSignups", type: "number", description: "The goal number of signups.", default: "1000" },
  //     { name: "milestones", type: "number[]", description: "Array of signup counts to show as markers.", default: "[250, 500, 750]" },
  //     { name: "className", type: "string", description: "Additional CSS classes.", default: "undefined" },
  //   ],
  // },
];
