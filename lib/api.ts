
import React from "react"; // Explicit import for React

export async function getProducts() {
  try {
    const response = await fetch("https://template6-six.vercel.app/api/products");
    const data = await response.json();
    return data.products; // Assuming `products` is the key in the API response
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
export async function getProduct(id: string) {
  try {
    const response = await fetch(`https://template6-six.vercel.app/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
