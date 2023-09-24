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
    include: {
      members: {
        include: {
          user: {
            select: {
              image: true,
              name: true
            }
          }
        }
      },
    },
  });

  return res.json(organization);
}