export const ProductsEmptyState = ({ onClearFilters }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg
        className="w-8 h-8 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">
      No products found
    </h3>
    <p className="text-sm text-gray-500 mb-4">
      Try adjusting your filters to find what you're looking for.
    </p>
    <button
      onClick={onClearFilters}
      className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
    >
      Clear all filters
    </button>
  </div>
);

