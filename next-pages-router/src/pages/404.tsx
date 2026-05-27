import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <Image src="/404.svg" alt="Vercel Logo" width={100} height={100} />
      <p>
        Back to <Link href="/">Home</Link>
      </p>
    </div>
  );
}
