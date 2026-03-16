import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

export function Sheet({ open, onOpenChange, children }) {
  if (!open) return null;
  return children({ open, onOpenChange });
}

export function SheetOverlay({ className, ...props }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export function SheetContent({ className, side = "right", ...props }) {
  const sideClasses =
    side === "left"
      ? "left-0"
      : side === "right"
        ? "right-0"
        : "";

  const node = (
    <div
      className={cn(
        "fixed inset-y-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out",
        sideClasses,
        className,
      )}
      {...props}
    />
  );

  if (typeof document === "undefined") return node;

  return createPortal(node, document.body);
}

export function useNoScroll(open) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
}

