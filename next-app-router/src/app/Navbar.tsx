import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathName = usePathname();
  const { status } = useSession();

  return (
    <nav className="flex justify-between px-28 py-5 items-center bg-gray-600 text-white">
      <Link href="/" className="text-2xl">
        Next
      </Link>
      <ul>
        <li className="flex gap-3 text-md items-center">
          <Link href="/" className={pathName === "/" ? "text-gray-300" : ""}>
            Home
          </Link>
          <Link
            href="/about"
            className={pathName === "/about" ? "text-gray-300" : ""}
          >
            About
          </Link>
          <Link
            href="/about/profile"
            className={pathName === "/about/profile" ? "text-gray-300" : ""}
          >
            Profile
          </Link>
          {/*  Jika menggunakan signIn() walaupun tidak diset pages di nextauth maka akan menggunakan tampilan login nextauth */}
          {status === "unauthenticated" && (
            <button onClick={() => signIn()}>Login</button>
          )}
          {status === "authenticated" && (
            <button onClick={() => signOut()}>Logout</button>
          )}
        </li>
      </ul>
    </nav>
  );
}
