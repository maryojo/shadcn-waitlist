"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const MOCK_FAQS: FAQItem[] = [
  {
    question: "When will the product launch?",
    answer:
      "We're aiming for a Q3 release. In the meantime, we're slowly rolling out access to early waitlist members to ensure a smooth experience.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes, we will offer a generous free tier for individuals and small teams. Pro features will be available through our paid plans.",
  },
  {
    question: "Can I invite my team?",
    answer:
      "Absolutely! Once you're granted access, you'll be able to invite your team members to join your workspace.",
  },
  {
    question: "How do I get early access?",
    answer:
      "The best way to get early access is to join our waitlist and share your referral link. Active community members may also receive early invites.",
  },
];

export function FAQSection({ faqs = MOCK_FAQS }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2 className="text-sm font-medium text-gray-500 mb-2 tracking-wide uppercase">FAQ</h2>
        <h3 className="text-3xl font-semibold text-gray-900 leading-tight">
          Frequently asked questions
        </h3>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1], // Strong ease-out
              }}
              className={`border rounded-2xl bg-white overflow-hidden shadow-sm transition-colors duration-200 ${
                isOpen ? "border-gray-200" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <motion.button
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between p-6 text-left group bg-white hover:bg-gray-50/50 transition-colors"
                aria-expanded={isOpen}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <span className="font-medium text-gray-900 group-hover:text-black transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </motion.div>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                    exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.3,
                      ease: [0.32, 0.72, 0, 1], // iOS-like drawer curve
                    }}
                  >
                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
