import { Heart } from "lucide-react";
import useWishlistContext from "../../hooks/useWishlistContext";
import { NavLink } from "react-router-dom";

function WishlistIcon() {
  const { wishlistItems } = useWishlistContext();
  const wishlistCount = wishlistItems.length;

  return (
    <>
      <NavLink to="/wishlist" className="relative">
        <Heart />
        {wishlistCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </NavLink>
    </>
  );
}

export default WishlistIcon;
