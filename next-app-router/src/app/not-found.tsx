"use client"; // Error components must be Client Components

import Link from "next/link";

export default function Page() {
  return (
    <>
      <p>
        Ups, Your page is not found! <Link href="/">Back to Home</Link>
      </p>
    </>
  );
}
