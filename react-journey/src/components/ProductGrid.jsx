import ProductCard from "../ProductCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorFetching";
import useProducts from "../hooks/useProducts";

function ProductGrid() {
  const { products, isLoading, error, retry } = useProducts();
  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  if (isLoading) {
    return <Loading title="Loading products..." />;
  }

  if (products.length === 0) {
    return <EmptyState title="No Products Found" />;
  }

  return (
    <>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </>
  );
}

export default ProductGrid;
