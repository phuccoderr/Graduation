import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "cn";

const ring =
  "bg-[conic-gradient(from_var(--glow-angle),#8A6A2E_0%,#F3DFA2_20%,#C9A961_45%,#8A6A2E_70%,#F3DFA2_90%,#8A6A2E_100%)] animate-[glow-spin_4s_linear_infinite]";

export const GlowBorderButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, children, ...props }, ref) => (
  <div className="group relative inline-flex rounded-xl p-[1.5px]">
    {/* Glow mờ phía sau */}
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-1 rounded-2xl opacity-40 blur-md transition-opacity duration-300 group-hover:opacity-0",
        ring,
      )}
    />
    {/* Viền sáng */}
    <span
      aria-hidden
      className={cn(
        "absolute inset-0 rounded-xl transition-opacity duration-300 group-hover:opacity-0",
        ring,
      )}
    />

    {/* Nút chính: nền đặc + gradient gold trong suốt 80% */}
    <Button
      ref={ref}
      className={cn(
        "relative rounded-[10px] border-0 px-6 font-medium text-[#2A1F0A] shadow-none",
        "bg-[#c9a961]",
        "hover:border hover:border-[#c9a961] hover:bg-transparent hover:text-[#c9a961]",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  </div>
));
GlowBorderButton.displayName = "GlowBorderButton";
