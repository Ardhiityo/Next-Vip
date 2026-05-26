// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { retrieveData, retrieveDataById } from "../../../lib/firebase/service";

type Data = {
    status: number,
    data: any
}

// http://localhost:3000/api/hello
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id = req.query.id;

    if (!id) return res.status(400).json({ status: 404, data: "id not found" });

    const data = await retrieveDataById("products", id as string);

    res.status(200).json({ status: 200, data: data })
}
