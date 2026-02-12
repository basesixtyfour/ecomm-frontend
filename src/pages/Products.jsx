import { useCallback, useEffect, useReducer, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGridSkeleton } from "../components/ProductGridSkeleton";
import { ProductSidebar } from "../components/ProductSidebar";
import { ProductGrid } from "../components/ProductGrid";
import { ProductsEmptyState } from "../components/ProductsEmptyState";
import { fetchProducts } from "../services/api";
import { toast } from "react-toastify";

const CATEGORY_NAME_TO_ID = {
  "Electronics": 1,
  "Household Supplies": 2,
  "Personal Wellness": 3,
  "Grocery": 4,
  "Fashion": 5,
  "Home & Kitchen": 6,
  "Books": 7,
  "Sports & Outdoors": 8,
  "Beauty": 9,
  "Toys & Games": 10,
  "Office & Stationery": 11,
  "Pet Supplies": 12,
};

const initialState = {
  selectedCategories: [],
  sortBy: "default",
  products: [],
  nextCursor: null,
  hasMore: false,
  totalCount: 0,
  status: "loading", // "loading" | "ready" | "loadingMore" | "error"
  error: null,
};

function productsReducer(state, action) {
  switch (action.type) {
    case "filters/setCategories":
      return { ...state, selectedCategories: action.payload };
    case "filters/setSortBy":
      return { ...state, sortBy: action.payload };
    case "filters/clear":
      return {
        ...state,
        selectedCategories: [],
        sortBy: "default",
        products: [],
        nextCursor: null,
        hasMore: false,
        totalCount: 0,
        status: "loading",
        error: null,
      };
    case "products/fetchStart": {
      const mode = action.payload?.mode;
      if (mode === "more") {
        return { ...state, status: "loadingMore", error: null };
      }
      return {
        ...state,
        status: "loading",
        error: null,
        products: [],
        nextCursor: null,
        hasMore: false,
        totalCount: 0,
      };
    }
    case "products/fetchSuccess": {
      const { mode, data, nextCursor, hasMore, totalCount } = action.payload;
      if (mode === "more") {
        return {
          ...state,
          status: "ready",
          products: [...state.products, ...data],
          nextCursor,
          hasMore,
          totalCount,
        };
      }
      return {
        ...state,
        status: "ready",
        products: data,
        nextCursor,
        hasMore,
        totalCount,
      };
    }
    case "products/fetchError":
      return { ...state, status: "error", error: action.payload };
    default:
      return state;
  }
}

export const Products = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const activeRequestRef = useRef({ id: 0, controller: null });

  const fetchAndDispatchProducts = useCallback(
    async ({ mode, cursor }) => {
      if (activeRequestRef.current.controller) {
        activeRequestRef.current.controller.abort();
      }

      const controller = new AbortController();
      const requestId = activeRequestRef.current.id + 1;
      activeRequestRef.current = { id: requestId, controller };

      dispatch({ type: "products/fetchStart", payload: { mode } });

      const categoryIds = state.selectedCategories
        .map((name) => CATEGORY_NAME_TO_ID[name])
        .filter(Boolean);

      const sortByPrice = state.sortBy !== "default";
      const sortByPriceAsc = state.sortBy === "price-low";

      try {
        const res = await fetchProducts({
          categoryIds,
          sortByPrice,
          sortByPriceAsc,
          cursor,
          limit: 6,
          search: searchQuery,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;
        if (requestId !== activeRequestRef.current.id) return;

        if (!res.success) {
          dispatch({
            type: "products/fetchError",
            payload: res.message || "Failed to fetch products",
          });
          return;
        }

        const result = res.data;
        dispatch({
          type: "products/fetchSuccess",
          payload: {
            mode,
            data: result.data,
            nextCursor: result.nextCursor,
            hasMore: result.hasMore,
            totalCount: result.totalCount,
          },
        });
      } catch (err) {
        if (controller.signal.aborted) return;
        if (requestId !== activeRequestRef.current.id) return;

        const msg = err?.message || "Failed to fetch products";
        toast.error(msg, { toastId: "products:exception" });
        dispatch({
          type: "products/fetchError",
          payload: msg,
        });
      }
    },
    [searchQuery, state.selectedCategories, state.sortBy]
  );

  useEffect(() => {
    fetchAndDispatchProducts({ mode: "initial", cursor: null });

    return () => {
      if (activeRequestRef.current.controller) {
        activeRequestRef.current.controller.abort();
      }
    };
  }, [fetchAndDispatchProducts]);

  const handleLoadMore = () => {
    if (!state.nextCursor) return;
    if (state.status === "loadingMore") return;

    fetchAndDispatchProducts({ mode: "more", cursor: state.nextCursor });
  };

  const handleClearFilters = () => {
    dispatch({ type: "filters/clear" });
  };

  const isLoading = state.status === "loading";
  const isLoadingMore = state.status === "loadingMore";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {searchQuery ? `Search results for "${searchQuery}"` : "Our Products"}
        </h1>
        
        <div className="flex gap-8">
          <ProductSidebar
            selectedCategories={state.selectedCategories}
            onCategoryChange={(cats) =>
              dispatch({ type: "filters/setCategories", payload: cats })
            }
            sortBy={state.sortBy}
            onSortChange={(nextSortBy) =>
              dispatch({ type: "filters/setSortBy", payload: nextSortBy })
            }
            onClearFilters={handleClearFilters}
          />

          <div className="flex-1">
            {isLoading ? (
              <ProductGridSkeleton />
            ) : state.products.length === 0 ? (
              <ProductsEmptyState onClearFilters={handleClearFilters} />
            ) : (
              <ProductGrid
                products={state.products}
                totalCount={state.totalCount}
                hasMore={state.hasMore}
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
