"use client";

import { signIn } from "next-auth/react";

export default function Page() {
  // http://localhost:3000/login

  // Khusus custom page login
  async function handleLogin(event: any) {
    event.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email: event.target.email.value,
      password: event.target.password.value,
      callbackUrl: "http://localhost:3000/products",
    });

    if (!response?.ok) {
      console.log(response?.error);
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={(event) => handleLogin(event)}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
