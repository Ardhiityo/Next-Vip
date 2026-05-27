import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();
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
        </li>
      </ul>
    </nav>
  );
}
