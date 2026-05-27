import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json(); //{ name: 'Arya', role: 'Admin' }

  return NextResponse.json({ status: 200, data: body });
}
