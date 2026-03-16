import { Filter, ArrowUpDown, X } from "lucide-react";

const CATEGORIES = [
  "Electronics",
  "Clothing & Fashion",
  "Home & Kitchen",
  "Books & Stationery",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games",
  "Automotive",
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
    <aside className="sticky top-8 h-fit w-64 border-2 border-black bg-white p-5 shadow-[var(--shadow-hard-md)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-black">
          <Filter className="h-4 w-4" />
          FILTERS
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 transition-colors hover:text-black"
          >
            <X className="h-3 w-3" />
            CLEAR
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-black">
          CATEGORIES
        </h3>
        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={[
                    "inline-flex items-center gap-1.5 border-2 border-black px-3 py-1.5 text-xs font-semibold uppercase transition-transform",
                    active
                      ? "bg-black text-white translate-x-0.5 translate-y-0.5"
                      : "bg-white text-neutral-800 hover:bg-black hover:text-white",
                  ].join(" ")}
                >
                  <span className="truncate">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="my-4 border-t-2 border-black" />

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-black">
          <ArrowUpDown className="h-4 w-4" />
          SORT
        </h3>
        <div className="space-y-1">
          {SORT_OPTIONS.map((option) => {
            const active = sortBy === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSortChange(option.value)}
                className={[
                  "flex w-full items-center justify-between border-2 border-black px-3 py-2 text-xs font-semibold uppercase transition-transform",
                  active
                    ? "bg-black text-white translate-x-0.5 translate-y-0.5"
                    : "bg-white text-neutral-800 hover:bg-black hover:text-white",
                ].join(" ")}
              >
                <span>{option.label}</span>
                {active && (
                  <span className="h-1.5 w-4 border-b-2 border-white" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
