import ProductCard from "../ProductCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorFetching";
import useProducts from "../hooks/useProducts";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import useDebounce from "../hooks/useDebounce";

function ProductGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { products, isLoading, error, refetch } = useProducts(debouncedQuery);

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    // console.log(e.target.value);
  }
  //   useEffect(() => {
  //     console.log("searchQuery", searchQuery);
  //   }, [searchQuery]);

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (isLoading) {
    return <Loading title="Loading products..." />;
  }

  //   if (filteredProducts.length === 0) {
  //     return <EmptyState title="No Products Found" />;
  //   }

  return (
    <>
      <SearchBar
        value={searchQuery}
        placeholder="Search Products..."
        onChange={handleSearchChange}
      />

      <div className="products-grid">
        {products.length === 0 ? (
          <EmptyState title="No Products Found" />
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ProductGrid;
