import { NavLink } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import QuantitySelector from "../components/QuantitySelector";
import { Trash2 } from "lucide-react";
import CartSummary from "../components/cart/ CartSummary";

function Cart() {
  const { cartItems, increaseCartQty, decreaseCartQty, removeFromCart } =
    useCartContext();

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-20">
          <h2 className="mb-3 text-2xl font-semibold">Your Cart is Empty</h2>

          <p className="mb-6 text-gray-500">
            Looks like you haven't added any products yet.
          </p>

          <NavLink
            to="/all-products"
            className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Cart Items */}

          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-28 w-28 m-auto rounded-lg bg-gray-100 object-contain p-2"
                />

                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="text-xl ">${item.price}</p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => increaseCartQty(item.id)}
                      onDecrease={() => decreaseCartQty(item.id)}
                    />

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 transition hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="md:text-right flex items-center gap-1">
                  <p className="text-sm text-gray-500">Subtotal</p>

                  <p className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border-t p-4">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
