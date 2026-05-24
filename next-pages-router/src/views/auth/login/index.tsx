import styles from "./Login.module.css";
import Head from "next/head";

export default function LoginView() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <h1 className={styles.title}>Login</h1>
      <form>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </>
  );
}
