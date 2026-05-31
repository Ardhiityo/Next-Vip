"use client";

/**
  - (.)details akan intercept /items/details/[id] dari /items/ (..) 
  - (..)details akan intercept /details/[id] dari /items/ 
  - (..)(..) Intersepsi rute di level dua di atas 
  - (...) Intersepsi rute di root (...)details akan intercept /details/[id] dari manapun

  Contoh di Proyekmu
  Struktur folder kamu:
  src/app/items/
  ├── @modal/              # Parallel Route slot
  │   └── (.)details/      # Intercept route di level yang sama
  │       └── [id]/
  │           └── page.tsx # Ini untuk modal
  └── details/
    └── [id]/
        └── page.tsx     # Ini untuk halaman biasa

   Cara Kerjanya:
    1. Ketika klik link ke /items/details/123 dari halaman /items/ :
    - Next.js akan menampilkan @modal/(.)details/[id]/page.tsx (modal)
    - Tetap menampilkan halaman /items/ di belakangnya
    2. Ketika refresh halaman atau buka langsung URL /items/details/123 :
   - Next.js akan menampilkan halaman biasa details/[id]/page.tsx
 */

import ProductDetail from "@/app/items/details/[id]/ProductDetail";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/app/items/Modal"));
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <Modal>
      <ProductDetail product={product} />
    </Modal>
  ) : (
    <p>Product Not Found...</p>
  );
}
