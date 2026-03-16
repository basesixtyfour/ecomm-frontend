import { cn } from "../../lib/utils";

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild,
  ...props
}) {
  const Component = asChild ? "span" : "button";

  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-none border-2 border-black bg-white text-black text-sm font-black tracking-tight uppercase transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ring-offset-background active:translate-x-0.5 active:translate-y-0.5";

  const variants = {
    default:
      "bg-black text-white shadow-[var(--shadow-hard-md)] hover:bg-white hover:text-black",
    outline:
      "bg-white text-black shadow-[var(--shadow-hard-md)] hover:bg-black hover:text-white",
    ghost:
      "border-none bg-transparent text-black hover:bg-black hover:text-white shadow-none",
    destructive:
      "bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] border-2 border-black shadow-[var(--shadow-hard-md)] hover:bg-black hover:text-[var(--color-destructive-foreground)]",
  };

  const sizes = {
    default: "h-11 px-5 py-2.5",
    sm: "h-9 px-4 text-xs",
    lg: "h-12 px-7 text-base",
    icon: "h-10 w-10",
  };

  return (
    <Component
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

