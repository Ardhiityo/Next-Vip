export default function DashboardLayout({
  children,
  products,
  analytics,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  analytics: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-slate-200">
        {products}
        {children}
        {analytics}
      </main>
    </>
  );
}
