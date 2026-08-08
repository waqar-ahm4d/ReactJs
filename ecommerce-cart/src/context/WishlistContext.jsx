import { createContext } from "react";
import useWishlist from "../hooks/useWishlist";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const wishlist = useWishlist();

  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
 