import Image from "next/image"
import style from "./ProductDetail.module.scss"

type Product = {
    id: number,
    name: string,
    category: string,
    price: string,
    image: string
}

export default function ProductDetail({ product }: { product: Product }) {

    return (
        <main className={style.container}>
            <h1 className={style.title}>Products</h1>
            <section className={style.product}>
                {
                    <div key={product.id} className={style.product__item}>
                        <Image
                            className={style.product__item__image}
                            src={product.image}
                            alt={product.name}
                            width={350}
                            height={100}
                            priority={false}
                            loading="lazy"
                        />
                        <h3 className={style.product__item__title}>
                            {product.name}
                        </h3>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                    </div>
                }
            </section>
        </main>)
}