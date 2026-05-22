import Link from "next/link"
import style from "./Navbar.module.scss"

export default function Navbar() {
    return (
        <nav className={style.navbar}>
            <h1 className={style.navbar__title}>Next Store</h1>
            <ul>
                <li><Link href="/">About</Link></li>
                <li><Link href="/">Contact</Link></li>
            </ul>
        </nav>
    )
}