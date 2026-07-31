import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/productService";

function useProducts(searchQuery = "", selectedCategory = "all") {
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
      setIsLoading(false);
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
    // products.filter((product) => product.title.toLowerCase().includes(query));
    return allProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
  }, [allProducts, query, selectedCategory]);

  return {
    filteredProducts: filteredProducts,
    allProducts,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}

export default useProducts;
