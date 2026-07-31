import { API_BASE_URL } from "./api";

export async function getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);

    if(!response.ok) {
        throw new Error("Failed to fetch Products");
    }

    return response.json();
}