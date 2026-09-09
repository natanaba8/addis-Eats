import { useContext } from "react";
import { CartContext } from "./CartContextValue";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used inside <CartProvider>. Wrap the component tree in <CartProvider> before calling useCart().",
    );
  }
  return context;
}