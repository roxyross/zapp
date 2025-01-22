// "use client";

// import { useState } from "react";
// import Link from "next/link";


// type WishlistItem = {
//   name: string;  
// };

// const WishlistPage = () => {
//   // Initialize wishlist with the correct type
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

//   return (
//     <div>
//       <h1>Your Wishlist</h1>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <ul>
//           {wishlist.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//         </ul>
//       )}
//       <Link href="/products">Go to Products</Link>
//     </div>
//   );
// };

// export default WishlistPage;
// "use client";

// import { useWishlist } from "@/src/context/WishlistContext";
// import Link from "next/link";

// const WishlistPage = () => {
//   const { wishlist, removeFromWishlist } = useWishlist();

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty.</p>
//       ) : (
//         <ul className="space-y-4">
//           {wishlist.map((item) => (
//             <li key={item.id} className="border p-4 rounded flex justify-between items-center">
//               <div>
//                 <h2 className="font-semibold">{item.name}</h2>
//               </div>
//               <button
//                 onClick={() => removeFromWishlist(item.id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <Link href="/products" className="text-blue-500 underline mt-4 block">
//         Go to Products
//       </Link>
//     </div>
//   );
// };

// export default WishlistPage;
"use client";

import { useWishlist } from "@/src/context/WishlistContext";
import Link from "next/link";
import HomePage from "../page";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-2">
          {wishlist.map((item) => (
            <li key={item.id} className="border p-4 rounded">
              <p className="font-bold">{item.title}</p>
            </li>
          ))}
        </ul>
      )}
      <Link href="/" className="text-blue-500 hover:underline">
      <Button className="mt-4">Return To HomePage</Button>
      </Link>
    </div>
  );
};

export default WishlistPage;
