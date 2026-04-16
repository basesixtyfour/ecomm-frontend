import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "../ui/button";

export const ProductGrid = ({
  products,
  totalCount,
  hasMore,
  onLoadMore,
  isLoadingMore,
}) => {
  return (
    <>
      <div className="mb-4 text-sm text-gray-500">
        Showing {products.length} of {totalCount} products
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="!bg-black !text-white hover:!bg-white hover:!text-black"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}
    </>
  );
};
