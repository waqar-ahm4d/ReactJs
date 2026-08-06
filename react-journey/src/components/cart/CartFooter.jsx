import { NavLink } from "react-router-dom";
import useCartContext from "../../hooks/useCartContext";
import CartSummary from "./ CartSummary";

function CartFooter() {
  const { cartItems, closeCart } = useCartContext();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      <div className="border-t p-4">
        <CartSummary />
        {/* <div className="mb-4 flex items-center justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)} USD</span>
        </div>
        <div className="flex flex-col gap-3">
          <button className="rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 ">
            Checkout
          </button>
        </div> */}
      </div>
    </>
  );
}

export default CartFooter;