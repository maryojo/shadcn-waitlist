"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars?: string[];
  extraCount?: string | number;
}

/**
 * A simple, elegant avatar stack component.
 * Features overlapping avatars with a border and optional extra count indicator.
 */
export function AvatarStack({
  avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=43",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=44",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=45",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=46",
  ],
  extraCount = "+1k",
  className,
  ...props
}: AvatarStackProps) {
  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {avatars.map((src, i) => (
        <div
          key={i}
          className="h-7 w-7 rounded-full border-2 border-white bg-muted overflow-hidden ring-1 ring-black/5 transition-transform hover:scale-110 hover:z-10 cursor-pointer"
        >
          <img
            src={src}
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      {extraCount && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] font-bold text-white ring-1 ring-black/5 transition-transform hover:scale-110 hover:z-10 cursor-pointer">
          {extraCount}
        </div>
      )}
    </div>
  );
}
