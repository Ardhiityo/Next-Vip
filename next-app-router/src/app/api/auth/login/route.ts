import { signIn } from "@/app/lib/firebase/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  return await signIn(data, ({ status, message, user }) => {
    return NextResponse.json({ status, message, user }, { status });
  });
}
