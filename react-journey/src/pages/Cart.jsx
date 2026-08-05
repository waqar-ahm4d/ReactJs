import { NavLink } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import QuantitySelector from "../components/QuantitySelector";
import { Trash2 } from "lucide-react";

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
                className="flex gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="h-28 w-28 rounded-lg bg-gray-100 object-contain p-2"
                />

                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="mt-2 text-2xl font-bold text-green-600">
                    ${item.price}
                  </p>

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

                <div className="text-right">
                  <p className="text-sm text-gray-500">Subtotal</p>

                  <p className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}

          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">Order Summary</h2>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-gray-600">Total Items</span>

              <span className="font-medium">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="mb-6 flex items-center justify-between border-t pt-4 text-xl font-bold">
              <span>Total</span>

              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800">
              Proceed to Checkout
            </button>

            <NavLink
              to="/all-products"
              className="mt-3 block text-center text-sm text-gray-500 hover:text-black"
            >
              Continue Shopping
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
