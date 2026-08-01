import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";

function useProduct(id) {
    const [product, setProduct] = useState(null); // api return obbject of pproduct that's why null is used. if a list is returned then [] would be used.
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchProduct(signal) {
        try{
            setIsLoading(true);
            setError(null);
            const data = await getProduct(id, signal);
            setProduct(data);
            console.log(product)
        } catch(err) {
            if(err.name === "AbortError") return;
            console.log('Failed to fetch product', err);
            setError(err.message || "Failed to fetch product");
        } finally {
            if(!signal.aborted) {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        fetchProduct(controller.signal);
        return () => controller.abort();
    }, [id])

    return {
        product,
        isLoading,
        error,
        refetch: fetchProduct
    };
}

export default useProduct;