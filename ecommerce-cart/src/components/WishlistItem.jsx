import { Link } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import useWishlistContext from "../hooks/useWishlistContext";
import { Heart, ShoppingCart } from "lucide-react";

function WishlistItem({ product }) {
  const { removeFromWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();

  function handleMoveToCart() {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center">
        <Link
          to={`/products/${product.id}`}
          className="flex items-center gap-4 flex-1"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-24 w-24 rounded-lg bg-gray-100 object-contain p-2"
          />

          <div className="flex-1">
            <p className="text-sm uppercase tracking-wide text-gray-500">
              {product.category}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{product.title}</h2>

            <p className="mt-2 text-2xl font-bold text-indigo-600">
              ${product.price}
            </p>
          </div>
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handleMoveToCart}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            <ShoppingCart size={18} />
            Move to Cart
          </button>

          <button
            onClick={() => removeFromWishlist(product.id)}
            className="rounded-lg border p-2 text-red-500 transition hover:bg-red-50"
          >
            <Heart size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </>
  );
}

export default WishlistItem;
