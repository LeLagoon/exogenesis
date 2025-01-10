import React from "react";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  classes?: string;
  type?: "button" | "submit" | "reset";
  onClickEvent?: (e: React.MouseEvent) => void
}

export function RainbowButton({
  children,
  classes,
  width,
  height,
  onClickEvent,
  ...props
}: ButtonProps) {
  if (onClickEvent) {
    return (
      <button
        className={cn(
          `group h-[6vh] h-[${height}] w-[${width}] relative inline-flex animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-gray-50 transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-900 dark:focus-visible:ring-gray-300`,
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(88deg,#EE2A70_2.76%,#651DFF_97.24%)] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
          "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(88deg,#EE2A70_2.76%,#651DFF_97.24%)]",
          classes,
        )}
        onClick={(e) => onClickEvent!(e)}
        {...props}
        type={props.type}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={cn(
        `group h-[6vh] h-[${height}] w-[${width}] relative inline-flex animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-gray-50 transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:text-gray-900 dark:focus-visible:ring-gray-300`,
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(88deg,#EE2A70_2.76%,#651DFF_97.24%)] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(88deg,#EE2A70_2.76%,#651DFF_97.24%)]",
        classes,
      )}
      {...props}
      type={props.type}
    >
      {children}
    </button>
  );
}
