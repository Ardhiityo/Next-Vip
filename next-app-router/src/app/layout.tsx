"use client";

import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { useState } from "react";
const popins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <html lang="en">
      <body className={popins.className}>
        <SessionProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto mt-10">
            {/* <p>Layout : {count}</p>
          <button onClick={() => setCount(count + 1)}>Count</button> */}
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
