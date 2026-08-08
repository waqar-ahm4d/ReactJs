import { Link } from "react-router-dom";
import useWishlistContext from "../hooks/useWishlistContext";
import WishlistItem from "../components/WishlistItem";

function Wishlist() {
  const { wishlistItems } = useWishlistContext();

  if (wishlistItems.length === 0) {
    return (
      <section className="max-auto max-w-7xl px-4 py-8">
        <h3 className="mb-3 text-3xl font-bold">Your Wishlist is Empty</h3>

        <p className="mb-6 text-gray-500">Save products you love for later.</p>

        <Link
          to="/all-products"
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Wishlist</h1>

          <p className="mt-2 text-gray-500">
            {wishlistItems.length} saved items
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {wishlistItems.map(product => (
            <WishlistItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
export default Wishlist;
