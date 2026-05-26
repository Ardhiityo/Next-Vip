// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveData } from "../../lib/firebase/service";

type Data = {
    status: number,
    data: any
}

// http://localhost:3000/api/hello
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = await retrieveData("products");
    res.status(200).json({ status: 200, data: data })
}
