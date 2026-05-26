// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: number,
    revalidate: boolean
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.query.data === 'product' && req.query.token === process.env.REVALIDATE_TOKEN) {
        await res.revalidate('/products/static')
        return res.json({ status: 200, revalidate: true });
    }

    res.status(401).json({ status: 401, revalidate: false })
}
