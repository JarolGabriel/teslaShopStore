import type { CartItem } from "@/interfaces";
import { defineAction } from "astro:actions";
import { db, eq, inArray, Product, ProductImage } from "astro:db";

export const loadProductsFromCart = defineAction({
  accept: "json",
  // input: z.array(
  //   z.object({
  //     productId: z.string(),
  //     size: z.string(),
  //     quantity: z.number(),
  //   })
  // ),

  handler: async (_, { cookies }) => {
    const cart = JSON.parse(cookies.get("cart")?.value ?? "[]") as CartItem[];

    // console.log("🍪 rawCookie:", cart);

    if (cart.length === 0) {
      console.log("🛑 Carrito vacío");
      return [];
    }

    const productIds = cart.map((item: any) => item.productId);

    // console.log("📦 Productos ID:", productIds);

    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, productIds));

    // console.log("📦 Productos cargados:", dbProducts);

    const products = cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);
      if (!dbProduct) {
        throw new Error(`Product ${item.productId} Not found`);
      }

      // console.log("📦 Productos filtrados :", products);

      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;

      return {
        productId: item.productId,
        title: title,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith("http")
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,

        price: price,
        slug: slug,
      };
    });

    // console.log("📦 Productos formateados a devolver:", products);
    return products;
  },
});
