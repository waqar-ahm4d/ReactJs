import useCartContext from "../../hooks/useCartContext";
import Drawer from "../ui/Drawer";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";

function CartDrawer() {
  const { isOpen, closeCart, cartItems } = useCartContext();
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
