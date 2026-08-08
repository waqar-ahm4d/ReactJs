import { useContext } from "react";
import CartContext from "../context/CartContext";

function useCartContext() {
  return useContext(CartContext);
}

export default useCartContext;
