import { NavLink } from "react-router-dom";

function Cart({ cartItems, increaseQty, decreaseQty, removeFromCart }) {
  console.log(cartItems);
  
  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return (
    <>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <NavLink to="/all-products">Continue Shopping</NavLink>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.images[0]} alt={item.title} width="60" />
              <h3>{item.title}</h3>
              <div className="item-qty">
                <span>Quantity:</span>
                <div className="qty-btn">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
              <p>${item.price}</p>
              <div className="subtotal">
                Subtotal: <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
          <div className="total">
            Total: <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
