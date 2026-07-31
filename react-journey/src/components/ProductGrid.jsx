import ProductCard from "../ProductCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorFetching";
import useProducts from "../hooks/useProducts";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function ProductGrid() {
  const { products, isLoading, error, retry } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    // console.log(e.target.value);
  }
  useEffect(() => {
    console.log("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => {
      clearTimeout(id);
    };
  }, [searchQuery]);

  useEffect(() => {
    console.log("debouncedQuery: ", debouncedQuery);
  }, [debouncedQuery]);

  const query = debouncedQuery.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query),
  );

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
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
        {filteredProducts.length === 0 ? (
          <EmptyState title="No Products Found" />
        ) : (
          filteredProducts.map((product) => (
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
