// // 'use client';

// // import React, { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { useCart } from '@/src/context/CartContext';
// // import createCheckoutSession from '@/lib/checkout-session';
// // import { loadStripe } from '@stripe/stripe-js';


// // const CheckoutPage = () => {
// //   const router = useRouter();
// //   const { cartItems } = useCart(); // Assume cart items are available in context
// //   const [name, setName] = useState<string>('');
// //   const [email, setEmail] = useState<string>('');
// //   const [address, setAddress] = useState<string>('');

// //   const calculateTotal = () => {
// //     return cartItems.reduce(
// //       (total, item) => total + item.price * (item.quantity || 1),
// //       0
// //     );
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!name || !email || !address) {
// //       alert('Please fill out all fields.');
// //       return;
// //     }

// //     try {
// //       const session = await createCheckoutSession(cartItems);
// //       const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

// //       if (!stripePublicKey) {
// //         throw new Error('Stripe public key is missing');
// //       }

// //       // const stripe = (await import('stripe')).Stripe(stripePublicKey);
// //       const stripe = Stripe(stripePublicKey); // Correct

// //       const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

// //       if (error) {
// //         console.error('Stripe Checkout error:', error);
// //         alert('Error processing payment.');
// //       }
// //     } catch (error) {
// //       console.error('Error creating checkout session:', error);
// //       alert('Something went wrong. Please try again.');
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-2xl font-bold mb-4">Checkout</h1>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <div>
// //           <label className="block font-medium">Name</label>
// //           <input
// //             type="text"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block font-medium">Email</label>
// //           <input
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block font-medium">Address</label>
// //           <input
// //             type="text"
// //             value={address}
// //             onChange={(e) => setAddress(e.target.value)}
// //             className="w-full p-2 border rounded"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <p className="font-bold text-right mb-4">Total: ${calculateTotal().toFixed(2)}</p>
// //         </div>
// //         <div>
// //           <button
// //             type="submit"
// //             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
// //           >
// //             Place Order
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CheckoutPage;

'use client';

import React, { useState } from 'react';
import SuccessPage from '../success/page';
import { useRouter } from 'next/navigation'; // Using Next.js App Router's useRouter
import { useCart } from '@/src/context/CartContext'; // Assuming you have a CartContext for cart items

const CheckoutPage = () => {
  const router = useRouter();
  const { cartItems } = useCart(); // Get cart items from context
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

    // Simulate order placement
    try {
      // You can add API call here to submit order data, like:
      // await fetch('/api/submit-order', { method: 'POST', body: JSON.stringify({ name, email, address, cartItems }) });

      // After order is successfully placed, redirect to the Thank You page
      alert('Order placed successfully!');
      router.push('/success'); // Redirect to /thank-you page
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong. Please try again.');
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




