import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorFetching";

function ProductDetails() {
  const { id } = useParams();
  const { product, isLoading, error, refetch } = useProduct(id);
  console.log(product);

  if (isLoading) return <Loading title="Product Loadind... " />;

  if (error) return <ErrorState message="Error Occured!" onRetry={refetch} />;

  return (
    <>
      <div className="product-section">
        <div className="product-gallery">
          <img src={product.image} alt="" width={400} />
        </div>
        <div className="product-info">
          <h3>{product.title}</h3>
          <div className="rating">
            <span>{product.rating.rate}</span>
            <span>({product.rating.count})</span>
          </div>
          <p>${product.price}</p>
        </div>
      </div>
      <p>{product.description}</p>
    </>
  );
}

export default ProductDetails;
