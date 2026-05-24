// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    return await signUp(
      req.body,
      ({ message, status }: { message: string; status: number }) => {
        return res.status(status).json({ status: status, message: message });
      },
    );
  }

  return res
    .status(405)
    .json({ status: 405, message: "Method is not allowed" });
}
