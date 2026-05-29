import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:-translate-y-0.5 hover:bg-emerald-700",
  secondary: "border border-emerald-200 bg-white text-emerald-800 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50",
  ghost: "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: keyof typeof variants;
};

export function LinkButton({ className = "", variant = "primary", href, ...props }: LinkButtonProps) {
  return <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
