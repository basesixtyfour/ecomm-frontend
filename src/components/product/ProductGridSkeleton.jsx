import { Skeleton } from "../ui/skeleton";

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <Skeleton className="h-40 w-full" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <div className="pt-2">
              <Skeleton className="h-9 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
