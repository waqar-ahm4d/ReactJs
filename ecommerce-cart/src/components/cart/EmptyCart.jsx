import { ShoppingBag } from "lucide-react";
import useCartContext from "../../hooks/useCartContext";
import { NavLink } from "react-router-dom";

function EmptyCart() {
  const { closeCart } = useCartContext();

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="rounded-full bg-gray-100 p-6">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Your cart is empty</h3>
          <p className="mt-2 text-gray-500">
            Looks like you haven't added anything yet.
          </p>
        </div>
        <NavLink
          to="/all-products"
          onClick={closeCart}
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Continue Shopping
        </NavLink>
      </div>
    </>
  );
}

export default EmptyCart;
