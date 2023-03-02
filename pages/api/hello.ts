/**
 * Visit: http://localhost:3000/api/hello
 * Or in the browser's console try:
 *
 *  fetch("/api/hello", {method: "post"})
 *     .then(res => res.json())
 *     .then(data => console.log(data));
 *
 * Refs:
 *  > https://nextjs.org/learn/basics/api-routes/api-routes-details
 *  > https://nextjs.org/docs/api-routes/introduction
 *  > https://nextjs.org/docs/advanced-features/preview-mode
 */

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: `Hello, you are using: ${req.method}` });
}
