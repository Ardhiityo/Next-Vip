import { fetcher } from "@/lib/swr/fetcher"
import ProductView from "@/views/product"
import Placeholder from "@/views/product/Placeholder"
import { useEffect, useState } from "react"
import useSWR from "swr"

type Product = {
    id: number,
    name: string,
    category: string,
    price: string,
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
    const { data, error, isLoading } = useSWR(`/api/products`, fetcher);

    useEffect(() => {
        const formattedProducts = data?.map((product: Product) => ({
            ...product,
            price: (product.price as unknown as number).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR'
            })
        }))
        setProducts(formattedProducts)
    }, [data, isLoading])

    return isLoading ? <Placeholder /> : <ProductView products={products} />
}