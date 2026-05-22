import Link from "next/link"
import Head from "next/head"

export default function RegisterView() {
    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <p>Sudah punya akun? <Link href="/auth/login">Login</Link></p>
        </>
    )
}