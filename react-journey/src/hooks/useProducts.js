import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

function useProducts() {
  const [error, setError] = useState(null);
  const [apiProducts, setApiProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();
      setApiProducts(data);
    } catch (err) {
      console.error("Failed to fetch", err);
      //   setError("Failed to fetch");
      setError(err.message || "Failed to fetch");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products: apiProducts,
    isLoading,
    error,
    retry: fetchProducts,
  };
}

export default useProducts;
