import Link from "next/link"
import { useRouter } from "next/router"
import styles from './Login.module.css'
import Head from "next/head"

export default function LoginView() {
    const router = useRouter()

    function handleLogin() {
        router.push('/products/1')
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <h1 className={styles.title}>Login</h1>
            <button onClick={handleLogin}>Login</button>
            <p>Belum punya akun? <Link href="/auth/register">Register</Link></p>
        </>
    )
}