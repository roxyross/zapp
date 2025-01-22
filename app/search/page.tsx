// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Search } from 'lucide-react';
// import Link from 'next/link';

// type Product = {
//   id: number;
//   title: string;
//   price: number;
//   imageUrl: string;
// };

// const SearchPage = () => {
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     // Fetch all products from the API on component mount
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://template6-six.vercel.app/api/products');
//         const data = await response.json();
//         setProducts(data.products);
//         setFilteredProducts(data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter products based on search query
//     if (query) {
//       setFilteredProducts(
//         products.filter((product) =>
//           product.title.toLowerCase().includes(query)
//         )
//       );
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Search Products</h1>
//       <div className="flex items-center border rounded-md px-3 py-2 mb-4">
//         <Search className="h-5 w-5 text-gray-500 mr-2" />
//         <input
//           type="text"
//           placeholder="Search for products..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="w-full outline-none"
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <div
//               key={product.id}
//               className="border rounded-md p-4 shadow hover:shadow-md transition"
//             >
//               <Link href={`/products/${product.id}`}>
//                 <img
//                   src={product.imageUrl}
//                   alt={product.title}
//                   className="w-full h-40 object-cover rounded-md mb-2"
//                 />
//                 <h2 className="font-semibold text-lg">{product.title}</h2>
//                 <p className="text-indigo-600 font-medium">${product.price}</p>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]); // Initialize as empty array
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Initialize as empty array

  useEffect(() => {
    // Fetch all products from the API on component mount
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://template6-six.vercel.app/api/products');
        const data = await response.json();
        setProducts(data.products || []); // Ensure products is always an array
        setFilteredProducts(data.products || []); // Ensure filteredProducts is always an array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter products based on search query
    if (query) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <div className="flex items-center border rounded-md px-3 py-2 mb-4">
        <Search className="h-5 w-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full outline-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-md p-4 shadow hover:shadow-md transition"
            >
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-indigo-600 font-medium">${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

