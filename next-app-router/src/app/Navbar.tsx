import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-28 py-5 items-center bg-gray-600 text-white">
      <Link href="/" className="text-2xl">
        Next
      </Link>
      <ul>
        <li className="flex gap-3 text-md items-center">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/about/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
