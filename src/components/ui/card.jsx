import { cn } from "../../lib/utils";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-none border-2 border-black bg-white text-black shadow-[var(--shadow-hard-md)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 border-b-2 border-black px-5 py-4", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-base font-black leading-none tracking-tight uppercase", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-neutral-700", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("px-5 py-4", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3 border-t-2 border-black px-5 py-4", className)}
      {...props}
    />
  );
}

