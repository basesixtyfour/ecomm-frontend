import { Loader2 } from "lucide-react";
import { ProductCard } from "../components/ProductCard";

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
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Products"
            )}
          </button>
        </div>
      )}
    </>
  );
};
