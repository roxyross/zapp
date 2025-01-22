"use client"; 

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/src/types/product";
import { useWishlist } from "@/src/context/WishlistContext";
import { useCart } from "@/src/context/CartContext";
import { CartItem } from "@/src/types/CartItem";


// // Add the new props
// interface ProductCardProps {
//   product: Product;
//   handleAddToCart: (cartItem: CartItem) => void;
//   handleAddToWishlist: (product: Product) => void;
//   isInWishlist: boolean;
// }
type ProductCardProps = {
  product: Product;  // This is fine to accept `Product`
  handleAddToCart: (cartItem: CartItem) => void;  // Ensure it's expecting CartItem
  handleAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
};


// const ProductCard = ({
//   product,
//   handleAddToCart,
//   handleAddToWishlist,
//   isInWishlist,
// }: ProductCardProps) => {
  const ProductCard = ({ product, handleAddToCart, handleAddToWishlist, isInWishlist }: ProductCardProps) => {
    // Call handleAddToCart with the correct CartItem
    const onAddToCart = () => {
      const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,  // Default quantity
      };
      handleAddToCart(cartItem); // Pass the CartItem instead of the Product
    };
  return (
    <Card>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <img
            src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </Link>
        <h2 className="mt-2 font-bold text-lg">{product.title}</h2>
        <p className="text-sm text-gray-500">{product.tags}</p>
        <p className="text-sm font-medium text-indigo-600">{`$${product.price}`}</p>
        <p className="text-sm font-medium text-indigo-600">{`$${product.discountPercentage}%`}</p>
        


        <div className="mt-2 flex space-x-2">
          <button
            onClick={() =>
              handleAddToCart({
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
            onClick={() => handleAddToWishlist(product)}
            className={`px-4 py-2 rounded ${
              isInWishlist ? "bg-gray-500" : "bg-green-500"
            } text-white`}
            disabled={isInWishlist}
          >
            {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

