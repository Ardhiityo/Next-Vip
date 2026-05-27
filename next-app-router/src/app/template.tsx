"use client";

import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <>
      {/* Jika menggunakan template maka state tidak akan disimpan setiap request */}
      {/* <p>Template : {count}</p>
      <button onClick={() => setCount(count + 1)}>Count</button> */}
      {children}
    </>
  );
}
