import style from "./Product.module.scss"

export default function Placeholder() {
    return (
        <main className={style.container}>
            <h1 className={style.title}>Products</h1>
            <div className={style.product__placeholder}>
                <div>
                    <div className={style.product__placeholder__image} />
                    <div className={style.product__placeholder__text} />
                    <div className={style.product__placeholder__text} />
                    <div className={style.product__placeholder__text} />
                </div>
                <div>
                    <div className={style.product__placeholder__image} />
                    <div className={style.product__placeholder__text} />
                    <div className={style.product__placeholder__text} />
                    <div className={style.product__placeholder__text} />
                </div>
                <div>
                    <div className={style.product__placeholder__image} />
                    <div className={style.product__placeholder__text} />
                    <div className={style.product__placeholder__text} />
                    <div className={style.product__placeholder__text} />
                </div>
            </div>

        </main >
    )
}