import { ShoppingCart, Tag, Package, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/price";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export const ProductCard = ({ product }) => {
  return (
    <Card className="group relative overflow-hidden bg-white transition-transform duration-150 hover:-translate-y-1">
      <div className="relative flex h-52 w-full items-center justify-center overflow-hidden bg-neutral-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <ShoppingCart className="h-16 w-16 text-neutral-500" />
        )}
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1 group-hover:text-neutral-700">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="mb-1 text-lg font-black">
          {formatPrice(product.price)}
        </p>

        <p className="mb-4 min-h-[2.5rem] text-sm text-neutral-700 line-clamp-2">
          {product.description}
        </p>

        {product.categories && product.categories.length > 0 && (
          <div className="mb-1 flex flex-wrap gap-2">
            {product.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 border-2 border-black bg-white px-2.5 py-1 text-xs font-semibold uppercase"
              >
                <Tag className="h-3 w-3" />
                {category.name}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/products/${product.id}`}>
            <Package className="mr-2 h-4 w-4" />
            View details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
