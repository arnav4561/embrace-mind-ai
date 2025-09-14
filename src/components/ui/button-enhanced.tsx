import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-raised hover:shadow-deep active:shadow-inset hover:scale-[0.98] active:scale-[0.96]",
        healing: "bg-gradient-healing text-primary-foreground shadow-raised hover:shadow-deep hover:brightness-110 active:shadow-inset hover:scale-[0.98] active:scale-[0.96]",
        sage: "bg-gradient-sage text-secondary-foreground shadow-raised hover:shadow-deep hover:brightness-110 active:shadow-inset hover:scale-[0.98] active:scale-[0.96]",
        leather: "bg-gradient-leather text-primary-foreground shadow-raised hover:shadow-deep hover:brightness-125 active:shadow-inset hover:scale-[0.98] active:scale-[0.96] border border-leather-light",
        warm: "bg-gradient-warm text-foreground shadow-raised hover:shadow-deep active:shadow-inset hover:scale-[0.98] active:scale-[0.96] border border-muted",
        crisis: "bg-destructive text-destructive-foreground shadow-raised hover:shadow-deep hover:brightness-110 active:shadow-inset hover:scale-[0.98] active:scale-[0.96] animate-pulse",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-soft hover:shadow-raised active:shadow-inset hover:scale-[0.98] active:scale-[0.96]",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-soft active:shadow-inset hover:scale-[0.98] active:scale-[0.96]",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105 active:scale-95",
        floating: "shadow-deep bg-card text-card-foreground hover:shadow-raised hover:scale-105 active:scale-95 border border-border backdrop-blur-sm",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-14 rounded-xl px-8 text-base font-semibold",
        xl: "h-16 rounded-xl px-10 text-lg font-bold",
        icon: "h-10 w-10",
        floating: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };