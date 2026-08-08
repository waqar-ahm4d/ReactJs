import { useEffect } from "react";
import useCartContext from "../../hooks/useCartContext";
import Drawer from "../ui/Drawer";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";

function CartDrawer() {
  const { isOpen, closeCart, cartItems } = useCartContext();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.addEventListener("keydown", handleKeyDown);
    };
  }, [closeCart]);

  return (
    <Drawer isOpen={isOpen} onClose={closeCart}>
      <CartHeader />
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <CartItems />
          <CartFooter />
        </>
      )}
    </Drawer>
  );
}
export default CartDrawer;
