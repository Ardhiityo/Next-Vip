import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

export default function AppShell({ children }: any) {
  const params = useRouter();
  const disabledPath = ["/auth/login", "/auth/register", "/404"];
  return (
    <>
      {!disabledPath.includes(params.pathname) && <Navbar />}
      {children}
    </>
  );
}
