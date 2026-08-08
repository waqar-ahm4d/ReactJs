import useCartContext from "../../hooks/useCartContext";
import CartItem from "./CartItem";

function CartItems() {
  const { cartItems } = useCartContext();
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
export default CartItems;
