import { NavLink } from "react-router-dom";

function Header({ cartItems }) {
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <header className="flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-products">Products</NavLink>
        <NavLink to="/practice">Practice</NavLink>
        <NavLink to="/cart">
          Cart <span className="cart-count">({cartCount})</span>
        </NavLink>
      </header>
    </>
  );
}

export default Header;
