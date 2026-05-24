import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

export default function RegisterView() {
  const { push } = useRouter();

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formEl = e.currentTarget; // simpan referensi form
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(form.entries());

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      formEl.reset();
      push("/auth/login");
    } else if (response.status == 400) {
      const body = await response.json();
      alert(body.message);
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <section>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <button type="submit">Register</button>
        </form>
      </section>
      <p>
        Sudah punya akun? <Link href="/auth/login">Login</Link>
      </p>
    </>
  );
}
