import useCartContext from "../../hooks/useCartContext";

function ProductActions({ product, quantity }) {
  const {addToCart} = useCartContext();

  return (
    <>
      <div className="product-actions">
        <button onClick={() => addToCart(product, quantity)}>Add to cart</button>
        <button>Buy Now</button>
      </div>
    </>
  );
}
export default ProductActions;
