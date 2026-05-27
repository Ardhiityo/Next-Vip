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
