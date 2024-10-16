import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/"); // 어떤 페이지를 revalidate 할지 정함
    return res.json({ revalidated: true });
  } catch {
    return res.status(500).send("Error Revalidating");
  }
}
