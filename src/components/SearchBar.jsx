import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../services/api";
import { toast } from "react-toastify";

export const SearchBar = ({ className }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);
  const latestTermRef = useRef("");
  const navigate = useNavigate();

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
          const res = await searchProducts(term);
          if (latestTermRef.current !== term) return;
          if (res.success) {
            setResults(res.data);
          } else {
            setResults([]);
          }
        } catch (err) {
          if (latestTermRef.current !== term) return;
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
      setResults([]);
      navigate(`/products?q=${encodeURIComponent(term)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className={`relative max-w-md w-full ${className || ""}`}>
      <div className="flex items-stretch">
        <input
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 h-10 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="px-3 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-r-md border border-l-0 border-gray-300 flex items-center justify-center transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {results.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                onClick={() => setResults([])}
                className="block px-4 py-2 hover:bg-gray-100"
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