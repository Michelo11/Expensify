import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const organization = await prisma.organization.findUnique({
    where: {
      id: id as string,
    },
  });

  return res.json(organization);
}