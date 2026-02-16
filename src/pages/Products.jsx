import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGridSkeleton } from "../components/ProductGridSkeleton";
import { ProductSidebar } from "../components/ProductSidebar";
import { ProductGrid } from "../components/ProductGrid";
import { ProductsEmptyState } from "../components/ProductsEmptyState";
import { fetchProducts } from "../services/api";
import { toast } from "react-toastify";

const SORT_TO_API_PARAM = {
  "default": "",
  "price-low": "price",
  "price-high": "-price",
};

const getPageFromUrl = (url) => {
  if (!url) return null;
  try {
    return Number(new URL(url).searchParams.get("page")) || null;
  } catch {
    return null;
  }
};

export const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const controllerRef = useRef(null);

  const loadProducts = async (controller, { page, applyResults, errorMsg }) => {
    try {
      const result = await fetchProducts({
        categories: selectedCategories,
        sort: SORT_TO_API_PARAM[sortBy] || "",
        search: searchQuery,
        page,
        signal: controller.signal,
      });

      if (controller.signal.aborted) return;

      applyResults(result);
      setTotalCount(result.count);
      setNextPage(getPageFromUrl(result.next));
    } catch (err) {
      if (controller.signal.aborted) return;
      toast.error(err?.message || errorMsg, {
        toastId: "products:exception",
      });
    }
  };

  useEffect(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setProducts([]);

    loadProducts(controller, {
      applyResults: (result) => setProducts(result.results),
      errorMsg: "Failed to fetch products",
    }).finally(() => {
      if (!controller.signal.aborted) setIsLoading(false);
    });

    return () => controller.abort();
  }, [selectedCategories, sortBy, searchQuery]);

  const handleLoadMore = async () => {
    if (!nextPage || isLoadingMore) return;

    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoadingMore(true);

    await loadProducts(controller, {
      page: nextPage,
      applyResults: (result) => setProducts((prev) => [...prev, ...result.results]),
      errorMsg: "Failed to load more products",
    });

    if (!controller.signal.aborted) setIsLoadingMore(false);
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {searchQuery ? `Search results for "${searchQuery}"` : "Our Products"}
        </h1>

        <div className="flex gap-8">
          <ProductSidebar
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
          />

          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton />
            ) : products.length === 0 ? (
              <ProductsEmptyState onClearFilters={handleClearFilters} />
            ) : (
              <ProductGrid
                products={products}
                totalCount={totalCount}
                hasMore={!!nextPage}
                onLoadMore={handleLoadMore}
                isLoadingMore={isLoadingMore}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
