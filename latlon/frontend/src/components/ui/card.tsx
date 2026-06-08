import type { ReactNode } from "react";
interface CardProps 
{
  children: ReactNode;
  extraStyles?: string;
}
export function Card ({children, extraStyles = ""}: CardProps) 
{
  return (
    <div
      className={`rounded-3xl border border-slate-800 bg-slate-950/85 p-6 ${extraStyles}`}>{children}</div>
  );
}