import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function SiteButton({ children, tone = "primary", className = "" }: {
  children: ReactNode;
  tone?: "primary" | "outline" | "light" | "inverted";
  className?: string;
}) {
  return <Button asChild className={`site-button site-button--${tone} ${className}`}>{children}</Button>;
}
