import type { ProductWithImages } from "@/interfaces";
import { ProductCard } from "@/components";

interface Props {
  product: ProductWithImages[];
}

export const ProductList = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 place-items-center">
      {product.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
