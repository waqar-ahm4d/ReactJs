import ProductActions from "./ProductActions";
import QuantitySelector from "./QuantitySelector";
import { useState } from "react";

function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h1 className="product-title">{product.title}</h1>
        <div className="rating-wrappper">
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <span className="rating">{product.rating.rate}</span>
          <div className="rating-count">({product.rating.count} reviews)</div>
        </div>
        <h3 className="product-price">${product.price}</h3>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <ProductActions product={product} quantity={quantity} />
        <div className="product-description">{product.description}</div>
      </div>
    </>
  );
}

export default ProductInfo;
