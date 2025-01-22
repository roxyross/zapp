"use client";

import Link from "next/link";
import { ShoppingCart, Heart, PhoneCall, Search } from "lucide-react";
import { useCart } from "@/src/context/CartContext";
import { useWishlist } from "@/src/context/WishlistContext";

export default function Header() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist(); // Access wishlist

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            ZAPP
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="relative">
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/contact">
              <PhoneCall className="h-4 w-4" />
            </Link>
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
