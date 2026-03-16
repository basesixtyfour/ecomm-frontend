import { cn } from "../../lib/utils";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-slate-200",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
}
