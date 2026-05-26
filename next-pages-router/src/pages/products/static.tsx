import ProductView from "@/views/product"

type Product = {
    id: number,
    name: string,
    category: string,
    price: string,
    image: string
}

// Incremental Static Regeneration (ISR) revalidate
// export const getStaticProps = async () => {
//     const response = await fetch('http://localhost:3000/api/products')
//     const body = await response.json()

//     // Format price di server, bukan di client
//     const formattedProducts = body.data.map((product: Product) => ({
//         ...product,
//         price: (product.price as unknown as number).toLocaleString('id-ID', {
//             style: 'currency',
//             currency: 'IDR'
//         })
//     }))

//     return {
//         props: {
//             products: formattedProducts
//         },
//         revalidate: 10
//     }
// }

// Incremental Static Regeneration (ISR) revalidate on demand (res.revalidate /products/static)
export const getStaticProps = async () => {
    const response = await fetch('http://localhost:3000/api/products')
    const body = await response.json()

    // Format price di server, bukan di client
    const formattedProducts = body.data.map((product: Product) => ({
        ...product,
        price: (product.price as unknown as number).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        })
    }))

    return {
        props: {
            products: formattedProducts
        }
    }
}

// Dirender diserver
export default function ProductPage(props: { products: Product[] }) {
    const { products } = props;

    return <ProductView products={products} />
}