import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlistContext must be used inside WishlistProvider");
  }

  return context;
}

export default useWishlistContext;
