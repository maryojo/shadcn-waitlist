"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
};

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    content:
      "I've been looking for a tool exactly like this for months. Signed up for the waitlist immediately! Can't wait to see what the team builds.",
    author: "Tim Bishop",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=43",
  },
  {
    id: 2,
    content:
      "The teaser alone looks incredible. If the final product is half as good as the waitlist page, this is going to be a game-changer.",
    author: "Sarah Jenkins",
    role: "Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=44",
  },
  {
    id: 3,
    content:
      "Finally, someone is solving this problem with focus on design and user experience. I'm counting down the days until launch.",
    author: "Michael Chang",
    role: "Indie Hacker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=45",
  },
];

export function StackedTestimonials({
  testimonials = MOCK_TESTIMONIALS,
}: {
  testimonials?: Testimonial[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Helper to get visible cards in correct order
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      cards.push({ item: testimonials[index], offset: i });
    }
    // Reverse so the active card (offset 0) is rendered last / on top
    return cards.reverse();
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 mb-2">Testimonials</h2>
        <h3 className="text-3xl font-semibold text-gray-900 leading-tight">
          See why others are joining <br className="hidden sm:block" />
          our exclusive waitlist.
        </h3>
      </div>

      <div className="relative bg-[#F4F4F6] rounded-3xl p-6 sm:p-10 min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden">
        {/* Navigation Arrows */}
        <div className="absolute top-4 left-8 z-20">
          <button
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        <div className="absolute top-4 right-8 z-20">
          <button
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative w-full md:max-w-[480px] h-[260px] sm:h-[320px]">
          <AnimatePresence mode="popLayout">
            {getVisibleCards().map(({ item, offset }) => {
              const isTop = offset === 0;

              return (
                <motion.div
                  key={item.id}
                  layoutId={`testimonial-card-${item.id}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    rotateZ: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: offset * 6,
                    rotateZ: offset === 0 ? 0 : offset === 1 ? -3 : 3,
                    zIndex: 10 - offset,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: -20,
                    rotateZ: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 px-5 pt-5 pb-6 sm:px-8 sm:pt-8 sm:pb-10 flex flex-col justify-between"
                >
                  <div className="mb-4 sm:mb-6">
                    <p className="text-gray-700 text-sm sm:text-lg leading-relaxed font-medium line-clamp-5 sm:line-clamp-none">
                      "{item.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full object-cover grayscale"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.author}
                      </div>
                      <div className="text-gray-500 text-xs">{item.role}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
