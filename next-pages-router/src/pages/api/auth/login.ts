// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "@/lib/firebase/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    return await signIn(
      req.body,
      ({
        data,
        message,
        status,
      }: {
        data?: object;
        message: string;
        status: number;
      }) => {
        return res.status(status).json({ data, message, status });
      },
    );
  }

  return res
    .status(405)
    .json({ status: 405, message: "Method is not allowed" });
}
