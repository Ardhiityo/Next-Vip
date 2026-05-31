import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "My Next app",
};

export default function ProductLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
