import { NextResponse } from "next/server";
import { signUp } from "@/app/lib/firebase/service";

export async function POST(request: Request) {
  const data = await request.json();

  return await signUp(data, ({ status, message }) => {
    return NextResponse.json({ status, message }, { status });
  });
}
