import type { ReactNode } from "react";
import { cn } from "../utils";

type BadgeProps = {
  variant: "success" | "warning" | "danger";
  children?: ReactNode;
  className?: string;
};

const variants = {
  success: "bg-green-300 text-green-700 font-semibold",
  warning: "bg-orange-300 text-orange-700 font-semibold",
  danger: "bg-red-300 text-red-700 font-semibold",
};

function Badge({ variant = "success", children, className = "" }: BadgeProps) {
  return (
    <span
      className={cn(
        `px-3 py-1.5 text-xs rounded-xl ${variants[variant]}`,
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
