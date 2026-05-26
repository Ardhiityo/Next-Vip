import ProductDetail from "@/views/productDetail/indext";
import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import Placeholder from "@/views/product/Placeholder";
import { useEffect, useState } from "react";

type Product = {
    id: number,
    name: string,
    category: string,
    price: string,
    image: string
}

// Client Side
// export default function Product() {
//     const params = useRouter();
//     const id = params.query.id as string;
//     const [product, setProduct] = useState<Product>()

//     const { data, error, isLoading } = useSWR(`/api/products/${id}`, fetcher);

//     useEffect(() => {
//         const formattedProduct = {
//             ...data,
//             price: (data?.price as unknown as number)?.toLocaleString('id-ID', {
//                 style: 'currency',
//                 currency: 'IDR'
//             })
//         }
//         setProduct(formattedProduct)
//     }, [data, isLoading])

//     if (data?.status === 404) return notFound();

//     return isLoading ? <Placeholder /> : product && <ProductDetail product={product} />
// }




// Server Side
// export async function getServerSideProps({ params }: { params: { id: string } }) {
//     const response = await fetch(`http://localhost:3000/api/products/${params.id}`)
//     const body = await response.json()

//     // Format price di server, bukan di client
//     const formattedProduct = {
//         ...body.data,
//         price: (body.data.price as unknown as number).toLocaleString('id-ID', {
//             style: 'currency',
//             currency: 'IDR'
//         })
//     }

//     return {
//         props: {
//             product: formattedProduct
//         }
//     }
// }

// export default function Product({ product }: { product: Product }) {
//     return <ProductDetail product={product} />
// }

// SSG 
//getStaticPaths : digunakan untuk generate static paths (id)
export async function getStaticPaths() {
    const response = await fetch(`http://localhost:3000/api/products`);
    const body = await response.json();

    const params = body.data.map((product: Product) => ({ params: { id: product.id.toString() } }));

    return {
        paths: params,
        fallback: false
    }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
    const response = await fetch(`http://localhost:3000/api/products/${params.id}`)
    const body = await response.json()

    const formattedProduct = {
        ...body.data,
        price: Number(body.data.price).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }),
    }

    return {
        props: {
            product: formattedProduct
        }
    }
}

export default function Product({ product }: { product: Product }) {
    return <ProductDetail product={product} />
}