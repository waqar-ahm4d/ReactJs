import { useState, useEffect, useMemo } from "react";
import { getProducts } from "../services/productService";

function useProducts(searchQuery = "") {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts(signal) {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts(signal);
      setProducts(data);
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
  if (!query) {
    return {
      products: products,
      isLoading,
      error,
      refetch: fetchProducts,
    };
  }
  const filteredProducts = useMemo(() => {
    products.filter((product) => product.title.toLowerCase().includes(query));
  }, [products, query]);

  return {
    products: filteredProducts,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}

export default useProducts;
