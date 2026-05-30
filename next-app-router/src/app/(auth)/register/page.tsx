"use client";
import { useRouter } from "next/navigation";

export default function Page() {
  // http://localhost:3000/register

  const { push } = useRouter();

  async function handleRegister(event: any) {
    event.preventDefault();

    const body = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const response = await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
    }

    push("/login");
  }

  return (
    <>
      <h1>Register Page</h1>
      <form onSubmit={(event) => handleRegister(event)}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
