import { ShoppingCart } from "lucide-react";
import useCartContext from "../../hooks/useCartContext";

function CartIcon() {
  const { openCart, cartCount } = useCartContext();
  return (
    <>
      <button onClick={openCart} className="relative">
        <ShoppingCart size={30} />
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ">
          {cartCount}
        </span>
      </button>
    </>
  );
}

export default CartIcon;
