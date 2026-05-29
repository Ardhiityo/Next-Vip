"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";

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
  const params = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`http://localhost:3000/api/products/${params.id}`)
        .then((res) => res.json())
        .then((res) => {
          setProduct(res.data);
          setLoading(false);
        })
        .catch((err) => new Error(err));
    }
  }, [params.id]);

  return loading ? (
    <p>Loading...</p>
  ) : product ? (
    <ProductDetail product={product} />
  ) : (
    <p>Product Not Found...</p>
  );
}
