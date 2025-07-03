import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild, ...props }, ref) => {
    const Component = asChild ? "span" : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          {
            // Variants
            default: "bg-blue-600 text-white hover:bg-blue-700",
            ghost:
              "bg-transparent hover:bg-gray-100 dark:hover:bg-neutral-800 dark:text-neutral-300",
          }[variant],
          {
            // Sizes
            sm: "px-2 py-1 text-sm",
            md: "px-4 py-2 text-base",
            lg: "px-6 py-3 text-lg",
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
