import { NavLink } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";

function Header() {
  const {cartItems} = useCartContext();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <header className="flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-products">Products</NavLink>
        <NavLink to="/practice">Practice</NavLink>
        <NavLink to="/reducer-demo">Reducer Demo</NavLink>
        <NavLink to="/cart">
          Cart <span className="cart-count">({cartCount})</span>
        </NavLink>
      </header>
    </>
  );
}

export default Header;
