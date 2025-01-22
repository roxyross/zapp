"use client";

import React from "react";
import { useCart } from "@/src/context/CartContext";
import { CartItem } from "@/src/types/CartItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calculate the total price of the cart
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Display all cart items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                  className="w-12 border rounded px-2 text-center"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        
          <div className="text-right mb-4">
            <h2 className="text-xl font-bold">Total Items: {totalItems}</h2>
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <Link href="/checkout">
              <Button className="mt-4">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
