import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { getCoupon } from "../services/coupons";

const initialState = {
  cartItems: [],
  isOpen: false,
  coupon: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      let found = false;
      const updatedCart = state.cartItems.map((item) => {
        if (item.id !== product.id) return item;
        found = true;
        return { ...item, quantity: item.quantity + quantity };
      });
      if (!found) {
        return {
          ...state,
          cartItems: [...updatedCart, { ...product, quantity }],
        };
      }
      return { ...state, cartItems: updatedCart };
    }
    case "DECREASE_QTY": {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item) return state;
      if (item.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload,
          ),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id !== action.payload) return item;
          return { ...item, quantity: item.quantity - 1 };
        }),
      };
    }
    case "INCREASE_QTY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id !== action.payload) return item;
          return { ...item, quantity: item.quantity + 1 };
        }),
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    }
    case "OPEN_CART": {
      return { ...state, isOpen: true };
    }
    case "CLOSE_CART": {
      return { ...state, isOpen: false };
    }
    case "APPLY_COUPON": {
      return { ...state, coupon: action.payload };
    }
    case "REMOVE_COUPON": {
      return { ...state, coupon: null };
    }
    default:
      return state;
  }
}

function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return initial;
    return { ...initial, ...JSON.parse(savedCart) };
  });

  useEffect(() => {
    const persistentState = {
      cartItems: state.cartItems,
      coupon: state.coupon,
    }
    localStorage.setItem("cart", JSON.stringify(persistentState));
  }, [state]);

  // useEffect(() => { // saves only cart items not cart summary
  //   localStorage.setItem("cart", JSON.stringify(state.cartItems));
  // }, [state.cartItems]);

  function findCartItem(productId) {
    return state.cartItems.find((item) => item.id === productId);
  }

  function addToCart(product, quantity) {
    const existingItem = findCartItem(product.id);

    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    if (existingItem) {
      toast.info(`Quantity Updated`);
    } else {
      toast.success(`${product.title} added to your cart`);
    }
    openCart();
  }

  function increaseCartQty(productId) {
    dispatch({ type: "INCREASE_QTY", payload: productId });
    toast.info(`Quantity Updated`);
  }

  function decreaseCartQty(productId) {
    const item = findCartItem(productId);

    dispatch({ type: "DECREASE_QTY", payload: productId });
    if (item.quantity === 1) {
      toast.error("Item removed");
    } else {
      toast.info(`Quantity Updated`);
    }
  }

  function applyCoupon(code) {
    const coupon = getCoupon(code);

    if (!coupon) return false;

    dispatch({ type: "APPLY_COUPON", payload: coupon });

    return true;
  }

  function removeCoupon() {
    dispatch({ type: "REMOVE_COUPON" });
  }

  function removeFromCart(productId) {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    toast.error("Item removed from cart");
  }

  function openCart() {
    dispatch({ type: "OPEN_CART" });
  }
  function closeCart() {
    dispatch({ type: "CLOSE_CART" });
  }

  const cartCount = state.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  let shipping = subtotal >= 100 ? 0 : 10;

  const tax = subtotal * 0.1;

  let discount = 0;

  if (state.coupon) {
    if (state.coupon.type === "percentage") {
      discount = Math.min(subtotal * (state.coupon.value / 100), subtotal);
    } else if (state.coupon.type === "fixed") {
      discount = Math.min(state.coupon.value, subtotal);
    } else if (state.coupon.type === "shipping") {
      shipping = 0;
    }
  }

  const total = subtotal + shipping + tax - discount;

  return {
    cartItems: state.cartItems,
    isOpen: state.isOpen,
    cartCount,
    subtotal,
    shipping,
    coupon: state.coupon,
    discount,
    tax,
    total,
    addToCart,
    increaseCartQty,
    decreaseCartQty,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    openCart,
    closeCart,
  };
}
export default useCart;
