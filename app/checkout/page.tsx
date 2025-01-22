
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Correct hook for Next.js App Router
// import { useCart } from "@/src/context/CartContext"; // Import useCart hook to get cart data

// const CheckoutPage = () => {
//   const router = useRouter();
//   const { cartItems } = useCart(); // Get cartItems from context
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [address, setAddress] = useState<string>("");

//   // Function to calculate the total price of cart items
//   const calculateTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * (item.quantity || 1),
//       0
//     );
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!name || !email || !address) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     // Placeholder logic for order processing
//     console.log({ name, email, address, cartItems });

//     alert("Order placed successfully!");
//     router.push("/thank-you"); // Redirect to a thank-you page
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <p className="font-bold text-right mb-4">Total: ${calculateTotal().toFixed(2)}</p> {/* Display formatted total */}
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Place Order
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CheckoutPage;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/src/context/CartContext'; // Assuming useCart provides cart items

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems } = useCart(); // Get cartItems from context
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // Function to calculate the total price of cart items
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !address) {
      alert('Please fill out all fields.');
      return;
    }

    // Create checkout session by calling the API
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      const { id } = await response.json();

      // Check if Stripe public key is available
      const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
      if (!stripePublicKey) {
        throw new Error('Stripe public key is missing');
      }

      // Redirect to Stripe Checkout
      const stripe = window.Stripe(stripePublicKey);  // No more error if the key is set
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      
      if (error) {
        console.error('Stripe Checkout error:', error);
        alert('Error with payment processing.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to create checkout session.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <p className="font-bold text-right mb-4">Total: ${calculateTotal().toFixed(2)}</p>
        </div>
        <div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
