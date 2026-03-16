import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../services/api";
import { toast } from "react-toastify";
import { mixpanel } from "../../lib/mixpanel";

export const SearchBar = ({ className }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  const latestTermRef = useRef("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const nextValue = e.target.value;
    setValue(nextValue);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const term = nextValue.trim();
      latestTermRef.current = term;

      if (term) {
        try {
          const res = await fetchProducts({ search: term });
          if (latestTermRef.current !== term) return;
          setResults(res.results);
        } catch (err) {
          if (latestTermRef.current !== term) return;
          mixpanel.track("Error", {
            error_type: "server",
            error_message: err?.message || "Search failed",
            page_url: window.location.href,
            user_id: user?.id,
          });
          toast.error(err?.message || "Search failed", { toastId: "search:exception" });
          setResults([]);
        }
      } else {
        setResults([]);
      }
    }, 200);
  };

  const handleSearch = () => {
    const term = value.trim();
    if (term) {
      mixpanel.track("Search", {
        search_query: term,
        user_id: user?.id,
        results_count: results.length,
      });
      setResults([]);
      navigate(`/products?search=${encodeURIComponent(term)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative w-full max-w-md ${className || ""}`}>
      <div className="flex items-stretch rounded-none border-2 border-black bg-white px-2 py-1 shadow-[var(--shadow-hard-md)] focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 focus-within:ring-offset-white transition-all">
        <div className="flex items-center px-2 text-neutral-500">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border-none bg-transparent px-1.5 py-1 text-sm text-black placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-1 inline-flex h-8 items-center justify-center rounded-none border-2 border-black bg-black px-3 text-xs font-black uppercase text-white shadow-[var(--shadow-hard-md)] hover:bg-white hover:text-black active:translate-x-0.5 active:translate-y-0.5 transition-transform"
          aria-label="Search"
        >
          Go
        </button>
      </div>

      {results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-none border-2 border-black bg-white shadow-[var(--shadow-hard-lg)]">
          {results.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                onClick={() => setResults([])}
                className="block px-4 py-2 text-sm text-black hover:bg-neutral-100"
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};