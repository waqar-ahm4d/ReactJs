import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorFetching";
import ProductImage from "../components/ProductDetails/ProductImage";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import { useState } from "react";

function ProductDetails({ cartItems, setCartItems }) {
  const { id } = useParams();
  const { product, isLoading, error, refetch } = useProduct(id);

  if (isLoading) return <Loading title="Product Loading... " />;

  if (error) return <ErrorState message="Error Occured!" onRetry={refetch} />;

  return (
    <>
      <div className="product-details">
        <div className="product-gallery">
          <ProductImage image={product.images[0]} title={product.title} />
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
