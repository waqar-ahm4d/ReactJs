import useCartContext from "../../hooks/useCartContext";
import { X } from "lucide-react";

function CartHeader() {
  const { cartItems, closeCart } = useCartContext();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-xl font-semibold">Your Cart</h2>
        </div>
        <p className="text-sm text-gray-500">
          {totalItems} item{totalItems !== 1 && "s"}
        </p>
        <button
          onClick={closeCart}
          className="rounded-full p-2 transition hover:bg-gray-100"
        >
          <X size={22} />
        </button>
      </div>
    </>
  );
}

export default CartHeader;
