import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category 1",
    price: 100,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category 2",
    price: 100,
    image: "https://via.placeholder.com/150",
  },
];

export async function GET(request: Request) {
  return NextResponse.json({ status: 200, data: products });
}
