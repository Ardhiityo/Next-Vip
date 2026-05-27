import { useRouter } from "next/router";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <p>Loading...</p>,
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function AppShell({ children }: any) {
  const params = useRouter();
  const disabledPath = ["/auth/login", "/auth/register", "/404"];
  return (
    <main className={roboto.className}>
      {!disabledPath.includes(params.pathname) && <Navbar />}
      {children}
    </main>
  );
}
