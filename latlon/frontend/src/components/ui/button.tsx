import type { ReactNode } from "react";
interface ButtonProps 
{
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}
export function Button ({children, onClick, type="button"}: ButtonProps) 
{
  return (
    <button type={type} onClick={onClick} className="rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">{children}
    </button>
  );
}