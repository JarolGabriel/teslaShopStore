import { loginUser, logout, registerUser } from "./auth";
import { loadProductsFromCart } from "./cart/load-from-cart.action";
import { getProductBySlug } from "./product/get-product-by-slug.action";
import { getProductByPage } from "./product/get-products-by-page.action";

export const server = {
  // actions

  // Auth
  loginUser,
  logout,
  registerUser,

  //productos

  getProductByPage,
  getProductBySlug,

  //Cart
  loadProductsFromCart,
};
