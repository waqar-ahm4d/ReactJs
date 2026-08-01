import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/productService";

function useProducts({
  searchQuery = "",
  selectedCategory = "all",
  sortBy = "default",
  minPrice = "",
  maxPrice = "",
}) {
  const [error, setError] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts(signal) {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts(signal);
      setAllProducts(data);
    } catch (err) {
      if (err.name === "AbortError") return;

      console.error("Failed to fetch", err);
      setError(err.message || "Failed to fetch");
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const query = searchQuery.trim().toLowerCase();
  // if (!query) {
  //   return {
  //     products: products,
  //     isLoading,
  //     error,
  //     refetch: fetchProducts,
  //   };
  // }
  //   console.log({
  //   searchQuery,
  //   selectedCategory,
  //   allProducts,
  // });
  const filteredProducts = useMemo(() => {

    const result = allProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice =
        (minPrice === "" || product.price >= Number(minPrice)) &&
        (maxPrice === "" || product.price <= Number(maxPrice));

      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case "price-low":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...result].sort((a, b) => b.price - a.price);
      case "name-a-z":
        return [...result].sort((a, b) => a.title.localeCompare(b.title));
      case "name-z-a":
        return [...result].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return result;
    }
  }, [allProducts, query, selectedCategory, sortBy, minPrice, maxPrice]);

  return {
    filteredProducts: filteredProducts,
    allProducts,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}

export default useProducts;
