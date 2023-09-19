import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const organizations = await prisma.organization.count({
    where: {
      members: {
        some: {
          userId: session.user!.id,
        },
      },
    },
  });

  if (organizations === 1) {
    return res
      .status(400)
      .json({ message: "You cannot delete your last organization" });
  }

  await prisma.organization.delete({
    where: {
      id: id as string,
    },
  });

  return res.json({ success: true });
}
