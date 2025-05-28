import type { ProductWithImages } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: ProductWithImages;
}

export const ProductCard = ({ product }: Props) => {
  const images = product.images.split(",").map((img) => {
    return img.startsWith("http")
      ? img
      : `${import.meta.env.PUBLIC_URL}/images/products/${img}`;
  });

  const [currentImages, setCurrentImages] = useState(images[0]);

  return (
    <a href={`/products/${product.slug}`}>
      <img
        src={currentImages}
        alt={product.title}
        className="h-[350px] object-contain"
        onMouseEnter={() => setCurrentImages(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImages(images[0])}
      />

      <h4>{product.title}</h4>
      <p>${product.price}</p>
    </a>
  );
};
