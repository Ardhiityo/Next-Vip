import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginView() {
  const { push, query, isReady } = useRouter();

  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    if (isReady) {
      setCallbackUrl(
        Array.isArray(query.callbackUrl)
          ? query.callbackUrl[0]
          : query.callbackUrl || "/",
      );
    }
  }, [isReady]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formEl = e.currentTarget; // simpan referensi form
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(form.entries());

    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: callbackUrl,
    });

    if (response?.ok) {
      formEl.reset();
      push(callbackUrl);
    } else {
      alert(response?.error);
    }
  }

  async function handleGoogleLogin() {
    const response = await signIn("google", {
      redirect: false,
      callbackUrl: callbackUrl,
    });

    if (response?.error) {
      alert(response?.error);
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </section>
      <p>
        Belum punya akun? <Link href="/auth/register">Register</Link>
      </p>
    </>
  );
}
