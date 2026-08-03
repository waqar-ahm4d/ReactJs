import ProductCard from "./ProductCard";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorFetching";
import useProducts from "../hooks/useProducts";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import useDebounce from "../hooks/useDebounce";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import PriceFilter from "./PriceFilter";
import { useSearchParams } from "react-router-dom";

function ProductGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  //   const [searchQuery, setSearchQuery] = useState(
  //     searchParams.get("search") || "",
  //   );
  const searchQuery = searchParams.get("search") || "";
  const debouncedQuery = useDebounce(searchQuery, 300);

  //   const [selectedCategory, setSelectedCategory] = useState(
  //     searchParams.get("category") || "all",
  //   );
  //   const [sortBy, setSortBy] = useState(searchParams.get("sort") || "default");
  //   const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");
  //   const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");
  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "default";
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";

  const isPriceRangeValid =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice);

  //   useEffect(() => {
  //     setSearchQuery(searchParams.get("search") || "");
  //     setSelectedCategory(searchParams.get("category") || "all");
  //     setSortBy(searchParams.get("sort") || "default");
  //     setMinPrice(searchParams.get("min") || "");
  //     setMaxPrice(searchParams.get("max") || "");
  //   }, [searchParams]);

  const { filteredProducts, allProducts, isLoading, error, refetch } =
    useProducts({
      debouncedQuery,
      selectedCategory,
      sortBy,
      minPrice,
      maxPrice,
    });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    updateParams("search", value, "");
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    updateParams("category", value, "all");
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    updateParams("sort", value, "default");
  };

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    updateParams("min", value, "");
  };
  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    updateParams("max", value, "");
  };

  function updateParams(key, value, defaultValue = "") {
    const params = new URLSearchParams(searchParams);
    if (!value || value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  }

  const resetFilters = () => {
    // setSearchQuery("");
    // setSelectedCategory("all");
    // setSortBy("default");
    // setMinPrice("");
    // setMaxPrice("");
    setSearchParams({});
  };
  const categories = useMemo(() => {
    return [...new Set(allProducts.map((product) => product.category))];
  }, [allProducts]);

  //   if (error) {
  //     return <ErrorState message={error} onRetry={refetch} />;
  //   }

  //   if (isLoading) {
  //     return <Loading title="Loading products..." />;
  //   }

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
      <div className="flex">
        <CategoryFilter
          value={selectedCategory}
          options={categories}
          onChange={handleCategoryChange}
        />
        <SortFilter value={sortBy} onChange={handleSortChange} />
      </div>
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
      />
      <div className="flex">
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <div className="flex">
        {isPriceRangeValid && (
          <p>Minimum price cannot be greater than maximum price.</p>
        )}
      </div>

      <div className="products-grid">
        {isLoading ? (
          <Loading title="Loading products..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : isPriceRangeValid ? (
          <EmptyState title="Invalid Price Range" />
        ) : filteredProducts.length === 0 ? (
          <EmptyState title="No Products Found" />
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
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
