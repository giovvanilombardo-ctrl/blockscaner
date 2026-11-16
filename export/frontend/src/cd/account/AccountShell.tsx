import "../cd.css";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import SiteLayout from "@/components/site/SiteLayout";
import { L } from "../CdShell";

export { L };

// Customer account pages render inside the main website (same header, footer, white/blue look).
export function CdRoot({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}

const sizes = { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-sm", xl: "h-14 px-8 text-base" };

export function CdButton({ variant = "hero", size = "md", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "hero" | "outline" | "ghost"; size?: keyof typeof sizes }) {
  const v = variant === "hero"
    ? "bg-primary text-primary-foreground font-semibold hover:opacity-90"
    : variant === "outline" ? "border border-border bg-background text-foreground hover:bg-secondary" : "text-foreground hover:bg-secondary";
  return <button {...p} className={cn("inline-flex items-center justify-center gap-2 rounded-md transition-all disabled:opacity-60", sizes[size], v, className)} />;
}

export function CdBack() {
  const nav = useNavigate();
  return (
    <button onClick={() => (window.history.length > 1 ? nav(-1) : nav("/"))} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <ArrowLeft className="h-4 w-4" />{L("Zurück", "Back")}
    </button>
  );
}
