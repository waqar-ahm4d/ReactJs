import { API_BASE_URL } from "./api";

export async function getProducts(signal) {
    const response = await fetch(`${API_BASE_URL}/products`, {signal});

    if(!response.ok) {
        throw new Error("Failed to fetch Products");
    }

    return response.json();
}