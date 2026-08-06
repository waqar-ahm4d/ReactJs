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

  if (isLoading) return <Loading title="Product Loading... " />;

  if (error) return <ErrorState message="Error Occured!" onRetry={refetch} />;

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 lg:flex-row lg:items-start">
      <div className="w-full lg:w-1/2">
        <ProductImage image={product.images[0]} title={product.title} />
      </div>

      <div className="w-full lg:w-1/2">
        <ProductInfo product={product} />
      </div>
    </section>
  );
}

export default ProductDetails;
