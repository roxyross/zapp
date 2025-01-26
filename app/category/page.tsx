"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import ShadCN tabs components
import { Card, CardContent } from "@/components/ui/card"; // Import ShadCN card components

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
  const [activeTab, setActiveTab] = useState<string>("");

  // Fetch categories and products
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      const categoryRes = await fetch("https://dummyjson.com/products/categories");
      const categoriesData = await categoryRes.json();
      setCategories(categoriesData);

      const productsData: { [key: string]: Product[] } = {};
      for (const category of categoriesData) {
        const productsRes = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const categoryProducts = await productsRes.json();
        productsData[category] = categoryProducts.products;
      }
      setProducts(productsData);

      if (categoriesData.length > 0) {
        setActiveTab(categoriesData[0]);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {/* Tabs Component */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tabs Content */}
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {products[category]?.map((product) => (
                <Card key={product.id} className="hover:shadow-lg">
                  <CardContent className="p-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h2 className="mt-2 font-bold text-lg">{product.title}</h2>
                    <p className="text-sm font-medium text-indigo-600">{`$${product.price}`}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
