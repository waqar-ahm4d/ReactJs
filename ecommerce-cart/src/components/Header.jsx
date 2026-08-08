import { Link, NavLink } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import logo from "../assets/logo.png";
import {
  Heart,
  LucideShoppingBag,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  ShoppingCart,
  ShoppingCartIcon,
} from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from "react";
import useWishlistContext from "../hooks/useWishlistContext";
import CartIcon from "./ui/CartIcon";
import WishlistIcon from "./ui/WishlistIcon";

function Header() {
  const { cartItems, cartCount } = useCartContext();
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
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-gray-700"
          }
          to="/"
        >
          <img src={logo} alt="" className="w-10 rounded-full" />
        </NavLink>
        <div className="flex gap-3 items-center justify-between">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700"
            }
            to="/all-products"
          >
            All Products
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700"
            }
            to="/cart"
          >
            Cart <span className="cart-count">({cartCount})</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700"
            }
            to="/checkout"
          >
            Checkout
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <WishlistIcon />
          <CartIcon />
        </div>
      </header>
    </>
  );
}

export default Header;
