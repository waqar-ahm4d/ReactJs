import ProductCard from "../ProductCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorFetching";
import useProducts from "../hooks/useProducts";
import { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import useDebounce from "../hooks/useDebounce";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";

function ProductGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [sortBy, setSortBy] = useState("default");

  const { filteredProducts, allProducts, isLoading, error, refetch } = useProducts(debouncedQuery, selectedCategory, sortBy);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  //   useEffect(() => {
  //     console.log("searchQuery", searchQuery);
  //   }, [searchQuery]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

//   const categories = [...new Set(allProducts.map((product) => product.category))];
//   console.log("Categories calculated");

const handleSortChange = (e) => {
    setSortBy(e.target.value);
}

  const categories = useMemo(() => {
    return [...new Set(allProducts.map(product => product.category))];
  }, [allProducts])
  
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
      
      <CategoryFilter
        value={selectedCategory}
        options={categories}
        onChange={handleCategoryChange}
      />
      <SortFilter value={sortBy} onChange={handleSortChange} />

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
