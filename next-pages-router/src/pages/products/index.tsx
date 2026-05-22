import ProductView from "@/views/product"
import Placeholder from "@/views/product/Placeholder"
import { useEffect, useState } from "react"
import useSWR from "swr"

type Product = {
    id: number,
    name: string,
    category: string,
    price: number,
    image: string
}

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([])

    // Non SWR
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const response = await fetch('/api/products')
    //         const body: { data: Product[] } = await response.json()
    //         setProducts(body.data)
    //     }
    //     fetchProducts()
    // }, [])

    // SWR
    const fetcher = async (url: string) => {
        try {
            const res = await fetch(url);
            const body = await res.json();
            return body.data;
        } catch (err) {
            console.error('Fetcher error:', err);
            throw err;
        }
    };

    const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

    return isLoading ? <Placeholder /> : <ProductView products={data} />
}