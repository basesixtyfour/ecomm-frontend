import { Filter, ArrowUpDown, X } from "lucide-react";

const CATEGORIES = [
  "Electronics",
  "Household Supplies",
  "Personal Wellness",
  "Grocery",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Beauty",
  "Toys & Games",
  "Office & Stationery",
  "Pet Supplies",
];

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export const ProductSidebar = ({
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) => {
  const hasActiveFilters = selectedCategories.length > 0 || sortBy !== "default";

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  return (
    <aside className="w-64 bg-white rounded-lg shadow-md border border-gray-200 p-5 h-fit sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
        <div className="max-h-48 overflow-y-auto pr-1">
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          Sort By
        </h3>
        <div className="space-y-2">
          {SORT_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortBy === option.value}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-4 h-4 text-gray-600 border-gray-300 focus:ring-gray-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {selectedCategories.length > 0 && (
        <>
          <div className="border-t border-gray-200 my-4" />
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Active Filters
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryToggle(category)}
                    className="hover:text-gray-900 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
};
