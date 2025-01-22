


// 'use client';

// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import { getProducts } from '@/lib/api';
// import { Product } from '@/src/types/product';
// import { useCart } from '@/src/context/CartContext';
// import { useWishlist } from '@/src/context/WishlistContext';
// import { title } from 'process';
// import { CartItem } from '@/src/types/CartItem';

// export default function ProductGrid() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const { addToCart } = useCart();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();  // Access wishlist context

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);


// const handleAddToCart = (product: Product) => {
//   const cartItem: CartItem = {
//     id: product.id,
//     title: product.title,  // map to CartItem title
//     price: product.price,  // map to CartItem price
//     quantity: 1,           // default quantity
//   };
  
//   addToCart(cartItem);  // Pass the CartItem
// };

  

//   const handleAddToWishlist = (product: Product) => {
//     const productExistsInWishlist = wishlist.some((item) => item.id === product.id);
//     if (productExistsInWishlist) {
//       removeFromWishlist(product.id);  // If product exists, remove it
//     } else {
//       addToWishlist(product);  // If product doesn't exist, add it
//     }
//   };

//   return (
   
//     <div className="max-w-6xl mx-auto px-4">
//   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//     {Array.isArray(products) ? (
//       products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           handleAddToCart={handleAddToCart} // Pass the updated handler
//           handleAddToWishlist={handleAddToWishlist}
//           isInWishlist={wishlist.some((item) => item.id === product.id)} // Check if the product is in the wishlist
//         />
//       ))
//     ) : (
//       <p>No products available.</p>
//     )}
//   </div>
// </div>

//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/src/types/product";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { CartItem } from "@/src/types/CartItem";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Updated `handleAddToCart` to accept a `CartItem`
  const handleAddToCart = (cartItem: CartItem) => {
    addToCart(cartItem);
  };

  const handleAddToWishlist = (product: Product) => {
    const productExistsInWishlist = wishlist.some((item) => item.id === product.id);
    if (productExistsInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(products) ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={(product) => {
                // Map the `Product` to a `CartItem` here before passing it
                handleAddToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  quantity: 1,
                });
              }}
              handleAddToWishlist={handleAddToWishlist}
              isInWishlist={wishlist.some((item) => item.id === product.id)}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
}
