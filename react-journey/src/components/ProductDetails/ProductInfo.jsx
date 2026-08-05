import QuantitySelector from "../QuantitySelector";
import RatingStars from "../ui/RatingStars";
import ProductActions from "./ProductActions";
import { useState } from "react";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  console.log(product);
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          {product.category}
        </p>

        <h1 className="text-3xl font-bold leading-tight text-gray-900">
          {product.title}
        </h1>

        <div className="flex items-center gap-2">
          {/* <span className="text-yellow-500">⭐⭐⭐⭐⭐</span> */}
          <RatingStars rating={product.rating}/>
          <span className="font-medium">{product.rating}</span>

          <span className="text-sm text-gray-500">
            ({product.reviews.length} reviews)
          </span>
        </div>

        <h3 className="text-3xl font-bold text-green-600">
          ${(product.price * quantity).toFixed(2)}
        </h3>
        <div className="my-2 flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </div>

        <ProductActions product={product} quantity={quantity} />

        <div>
          <h3 className="mb-2 text-lg font-semibold">Description</h3>

          <p className="leading-7 text-gray-600">{product.description}</p>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
