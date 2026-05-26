import { signIn, useSession, signOut } from "next-auth/react";
import style from "./Navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
  /**
    Secara teknis, useSession() tidak mengembalikan Promise, melainkan sebuah objek state React biasa.
    Meskipun di dalamnya ia melakukan proses asynchronous (fetch ke API), ia bekerja seperti hook pada umumnya (seperti useSWR atau useEffect ).

   useSession() mengembalikan objek yang berisi:
  - data : Berisi objek session (jika sudah berhasil fetch) atau null .
  - status : Sebuah string untuk memberi tahu kita progres fetch-nya:
  - "loading" : Sedang melakukan fetch (proses async sedang berjalan).
  - "authenticated" : Berhasil mendapatkan data session.
  - "unauthenticated" : Selesai fetch, tapi user tidak login.
   */
  const { data, status } = useSession();

  return (
    <nav className={style.navbar}>
      <h1 className={style.navbar__title}>
        <Link href="/">Next Store</Link>
      </h1>
      {status === "loading" && <p>Loading...</p>}
      {data?.user && (
        <div>
          <h4>{data.user.name}</h4>
          <button onClick={() => signOut()}>SignOut</button>
        </div>
      )}
      {status === "unauthenticated" && (
        <button onClick={() => signIn()}>Signin</button>
      )}
    </nav>
  );
}
