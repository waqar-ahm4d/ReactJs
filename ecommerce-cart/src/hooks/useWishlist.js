import { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems: [],
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      const product = action.payload;
      const exists = state.wishlistItems.some((item) => item.id === product.id);
      if (exists) return state;
      return { ...state, wishlistItems: [...state.wishlistItems, product] };
    }
    case "REMOVE_FROM_WISHLIST": {
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id !== action.payload,
        ),
      };
    }
    default:
      return state;
  }
}

function useWishlist() {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    initialState,
    (initial) => {
      const saved = localStorage.getItem("wishlist");
      if (!saved) return initial;

      return { ...initial, wishlistItems: JSON.parse(saved) };
    },
  );
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);

  function addToWishlist(product) {
    dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    toast.success("Added to  wishlist");
  }
  function removeFromWishlist(productId) {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
    toast.info("Removed from  wishlist");
  }
  function isInWishlist(productId) {
    return state.wishlistItems.some((item) => item.id === productId);
  }
  function toggleWishlist(product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }
  return {
    wishlistItems: state.wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };
}

export default useWishlist;
