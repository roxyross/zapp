"use client";

import Link from "next/link";
import {  Mail, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">About ZAPP</h2>
          <p className="text-sm text-gray-400">
            ZAPP is a modern e-commerce platform offering top-quality
            products at affordable prices. Shop with confidence and convenience!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-400 hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-gray-400 hover:text-white">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="font-bold text-lg mb-4">Contact Us</h2>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@ZAPP.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 ZAPP St, E-commerce City</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link href="mailto:support@swiftcard.com">
              <Mail className="h-5 w-5 text-gray-400 hover:text-white" />
            </Link>
            <Link href="/contact">
              <PhoneCall className="h-5 w-5 text-gray-400 hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} SwiftCard. All rights reserved.
      </div>
    </footer>
  );
}
