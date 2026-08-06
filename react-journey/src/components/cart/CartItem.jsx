import { Trash2 } from "lucide-react";
import useCartContext from "../../hooks/useCartContext";
import QuantitySelector from "../QuantitySelector";

function CartItem({ item }) {
  const { increaseCartQty, decreaseCartQty, removeFromCart } = useCartContext();

  return (
    <>
      <div className="flex gap-4 border-b px-4 py-2">
        <img
          src={item.images[0]}
          alt={item.title}
          className="h-24 w-24 rounded-lg object-contain bg-gray-100 p-2"
        />
        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 font-medium">{item.title}</h3>
          <p className="mt-1 font-normal">${item.price}</p>
          <div className="my-1 flex items-center justify-between">
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => increaseCartQty(item.id)}
              onDecrease={() => decreaseCartQty(item.id)}
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 transition hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <p>Subtotal:</p>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartItem;
