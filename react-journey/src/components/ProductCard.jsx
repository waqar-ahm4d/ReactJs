import { Link } from "react-router-dom";
import useWishlistContext from "../hooks/useWishlistContext";
import { Heart } from "lucide-react";

function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const wished = isInWishlist(product.id);
  return (
    <div className="relative rounded-lg z-0">
      <Link to={`/products/${product.id}`} className="flex flex-col">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:scale-110 active:scale-95"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 
            ${wished ? "text-red-500 scale-110" : "text-gray-500"}`}
            fill={wished ? "currentColor" : "transparent"}
          />
        </button>
        {product.images[0] && (
          <img
            className="mb-2 w-full rounded-lg object-contain bg-gray-100"
            src={product.images[0]}
            alt=""
            style={{ width: "auto", height: "100px" }}
          />
        )}
        {
          (product.price && (
            <span className="absolute top-1 left-2 font-semibold font-italic text-white bg-red-500 px-2 rounded">
              SALE
            </span>
          ))
        }
        <p>{product.category}</p>
        <h2 className="text-3xl mt-2">{product.title}</h2>
        <p className="text-2xl mt-2">
          ${product.price} <del className="text-xl">{product.comparePrice}</del>
        </p>
        {product.inStock && (
          <div>
            {product.inStock > 0 ? <p>In Stock ✅</p> : <p>Out of Stock ❌</p>}
          </div>
        )}
      </Link>
    </div>
  );
}

export default ProductCard;
