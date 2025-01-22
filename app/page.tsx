

"use client";

import React, { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/src/types/product";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]); // State to store API data
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();


  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://template6-six.vercel.app/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle Next Button
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle Previous Button
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  // Timer for auto-sliding the carousel every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [products]);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Welcome to Our Store
        </h1>

        {/* Carousel Section */}
        {products.length > 0 ? (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Featured Products
            </h2>
            <div className="relative overflow-hidden">
              <Carousel>
                <CarouselContent
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                  className="flex gap-6 transition-transform duration-500"
                >
                  {products.slice(0, 5).map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="flex justify-center items-center w-full"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full max-w-screen-lg max-h-[400px] sm:max-h-[300px] object-contain rounded-md"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  onClick={handlePrevious}
                  className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition"
                />
                <CarouselNext
                  onClick={handleNext}
                  className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition"
                />
              </Carousel>
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {/* Product Grid Section */}
        <section>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Browse Our Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  {/* <button className="mt-4 w-full py-2 px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 transition">
                    Add to Cart
                  </button> */}
                  <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title, // Map title to name
                price: product.price,
                quantity: 1,
              })
            }
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
          <button
  onClick={() => addToWishlist(product)}
  className={`px-4 py-2 rounded ${wishlist.some(item => item.id === product.id) ? "bg-gray-500" : "bg-green-500"} text-white`}
  disabled={wishlist.some(item => item.id === product.id)}
>
  {wishlist.some(item => item.id === product.id) ? "Added to Wishlist" : "Add to Wishlist"}
</button>

          
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
