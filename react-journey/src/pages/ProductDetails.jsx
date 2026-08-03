import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorFetching";
import ProductImage from "../components/ProductDetails/ProductImage";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import { useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const { product, isLoading, error, refetch } = useProduct(id);

  const [cartItems, setCartItems] = useState([]);

  if (isLoading) return <Loading title="Product Loading... " />;

  if (error) return <ErrorState message="Error Occured!" onRetry={refetch} />;

  return (
    <>
      <div className="product-details">
        <div className="product-gallery">
          <ProductImage image={product.image} title={product.title} />
        </div>
        <ProductInfo
          product={product}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
    </>
  );
}

export default ProductDetails;
