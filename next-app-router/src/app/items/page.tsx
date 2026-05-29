"use client";

import { useEffect, useState } from "react";
import ItemList from "./ItemList";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => new Error(err));
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : products.length > 0 ? (
    <ItemList products={products} />
  ) : (
    <p>No data...</p>
  );
}
