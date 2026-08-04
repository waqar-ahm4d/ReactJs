import { createContext } from "react";
import useCart from "../hooks/useCart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export default CartContext;
