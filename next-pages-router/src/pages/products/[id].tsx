import { useRouter } from "next/router"

export default function Product() {
    const params = useRouter().query
    return (
        <>
            <h1>Product Detail {params.id}</h1>
        </>
    )
}