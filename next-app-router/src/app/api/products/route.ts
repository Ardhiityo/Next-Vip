import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  return NextResponse.json({ status: 200, data: products });
}
