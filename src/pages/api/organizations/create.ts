import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { name, avatarUrl } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Invalid body" });
  }

  const organization = await prisma.organization.create({
    data: {
      name: name,
      avatarUrl: avatarUrl,
      members: {
        create: {
          userId: session.user!.id
        }
      }
    },
  });

  return res.json(organization);
}
