import { useEffect, useReducer } from "react";

const initialState = {
  cartItems: [],
  isOpen: false,
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
    default:
      return state;
  }
}

function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return initial;
    return { ...initial, cartItems: JSON.parse(savedCart) };
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  function addToCart(product, quantity) {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  }

  function increaseCartQty(productId) {
    dispatch({ type: "INCREASE_QTY", payload: productId });
  }

  function decreaseCartQty(productId) {
    dispatch({ type: "DECREASE_QTY", payload: productId });
  }
  function removeFromCart(productId) {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  }

  function openCart() {
    dispatch({ type: "OPEN_CART" });
  }
  function closeCart() {
    dispatch({ type: "CLOSE_CART" });
  }

  return {
    cartItems: state.cartItems,
    isOpen: state.isOpen,
    addToCart,
    increaseCartQty,
    decreaseCartQty,
    removeFromCart,
    openCart,
    closeCart
  };
}
export default useCart;
