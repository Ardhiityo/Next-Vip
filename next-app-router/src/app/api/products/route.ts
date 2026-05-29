import { NextResponse } from "next/server";
import { retrieveData } from "@/app/lib/firebase/service";

export async function GET(request: Request) {
  const products = await retrieveData("products");

  if (products.length === 0) {
    return NextResponse.json({ status: 404, data: [] });
  }

  return NextResponse.json({ status: 200, data: products });
}
