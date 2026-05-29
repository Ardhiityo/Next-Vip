import { NextResponse } from "next/server";
import { products } from "@/data/products";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, context: Params) {
  const { params } = context;

  if (params.id) {
    const product = products.find(
      (product) => product.id === parseInt(params.id),
    );
    if (product) {
      return NextResponse.json({ status: 200, data: product });
    }
  }
  return NextResponse.json({ status: 404, data: {} });
}
