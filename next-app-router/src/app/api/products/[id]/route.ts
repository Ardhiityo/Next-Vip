import { NextResponse } from "next/server";
import { retrieveDataById } from "@/app/lib/firebase/service";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, context: Params) {
  const { params } = context;

  if (params.id) {
    const product = await retrieveDataById("products", params.id);

    if (product) {
      return NextResponse.json({ status: 200, data: product });
    }
  }
  return NextResponse.json({ status: 404, data: {} });
}
