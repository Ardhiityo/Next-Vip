"use client";

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <html lang="en">
      <body className={inter.className}>
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
