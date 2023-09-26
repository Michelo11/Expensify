import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  const { id } = req.query;
  const { items }: {
    items: string[];
  } = req.body;

  if (!items) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: id as string,
      members: {
        some: {
          userId: session.user!.id,
        },
      },
    },
  });

  if (!organization)
    return res.status(404).json({ message: "Organization not found" });

  await prisma.transaction.deleteMany({
    where: {
      id: {
        in: items,
      },
    },
  });

  return res.json({
    success: true
  });
}
