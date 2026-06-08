import type { ReactNode } from "react";
interface BadgeProps 
{
  children: ReactNode;
  variant?: "blue" | "green";
}
export function Badge({children, variant = "blue"}: BadgeProps) {
  let badgeStyle = "";
  if (variant === "blue") 
  {
    badgeStyle = "bg-sky-500/20 text-sky-300";
  } 
  else 
  {
    badgeStyle = "bg-emerald-500/20 text-emerald-300"; 
  }
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${badgeStyle}`}> 
      {children}
    </span>
  );
}