import { useRouter } from 'next/router'

export default function ShopPage() {
    const router = useRouter()
    //[[...params]].tsx = berarti parameter /shop/** bisa memiliki banyak parameter & tidak wajib memiliki parameter & bisa menjadi index, tanpa harus membuat file index.tsx untuk /shop
    return (
        <>
            <h1>Shop Page : {router.query.params && `${router.query.params[0]}-${router.query.params[1]}`}</h1>
        </>
    )
}