"use client";
import React from "react";
import { Product } from "@/src/types/product";
import { useCart } from "@/src/context/CartContext";
import { Button } from "@/components/ui/button";
import { title } from "process";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    addToCart(cartItem);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-500">&#9733;</span>
        ))}
        {halfStar && <span className="text-yellow-500">&#9734;</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={index} className="text-gray-400">&#9734;</span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Product Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Product Images</h3>
          {/* <div className="flex space-x-4">
            {product.thumbnail.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-60 h-60 object-cover rounded-lg border"
              />
            ))}
          </div> */}
          <div className="flex space-x-4">
            {product.thumbnail ? (
              Array.isArray(product.thumbnail) ? (
                product.thumbnail.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Thumbnail ${index + 1}`}
                    className="w-60 h-60 object-cover rounded-lg border"
                  />
                ))
              ) : (
                <img
                  src={product.thumbnail}
                  alt="Product Thumbnail"
                  className="w-60 h-60 object-cover rounded-lg border"
                />
              )
            ) : (
              <p className="text-gray-500">No thumbnails available.</p>
            )}
          </div>

        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Price:</span> ${product.price.toFixed(2)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">In Stock:</span> {product.stock > 0 ? "Yes" : "No"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Stock Quantity:</span> {product.stock}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Sale:</span> {`${product.discountPercentage}%`}
          </p>

          <h3 className="text-xl font-semibold text-gray-800">Dimensions</h3>
          <p className="text-lg">
            <span className="font-semibold">Width:</span> {product.dimensions.width} cm
          </p>
          <p className="text-lg">
            <span className="font-semibold">Height:</span> {product.dimensions.height} cm
          </p>
          <p className="text-lg">
            <span className="font-semibold">Depth:</span> {product.dimensions.depth} cm
          </p>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg shadow-md border"
              >
                <h4 className="font-semibold text-gray-800">{review.reviewerName}</h4>
                {renderStars(review.rating)}
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Reviewed on: {review.date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
