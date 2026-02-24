import { ShoppingCart, Tag, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/price";

export const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200">
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <ShoppingCart className="w-16 h-16 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-xl font-bold text-gray-900 mb-3">
          {formatPrice(product.price)}
        </p>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {product.categories && product.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
              >
                <Tag className="w-3 h-3" />
                {category.name}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/products/${product.id}`}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" />
          View Product
        </Link>
      </div>
    </div>
  );
};
