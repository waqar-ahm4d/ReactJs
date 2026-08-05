import { NavLink } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import logo from "../assets/logo.png";
import {
  LucideShoppingBag,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from "react";

function Header() {
  const { openCart, cartItems } = useCartContext();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) return;
    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems]);

  return (
    <>
      <header className="flex justify-between w-full p-2 px-3 bg-gray-100">
        <NavLink to="/">
          <img src={logo} alt="" className="w-10 rounded-full" />
        </NavLink>
        <div className="flex gap-3 items-center justify-between">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/all-products">All Products</NavLink>
          {/* <NavLink to="/practice">Practice</NavLink>
          <NavLink to="/reducer-demo">Reducer Demo</NavLink> */}
          <NavLink to="/cart">
            Cart <span className="cart-count">({cartCount})</span>
          </NavLink>
        </div>
        <button onClick={openCart} className="relative">
          <ShoppingCart size={30} />
          <span className="absolute right-1 top-[0px] bg-red-500 rounded-full text-white text-[10px] w-4 h-4 line-[12px] ">
            {cartCount}
          </span>
        </button>
      </header>
    </>
  );
}

export default Header;
