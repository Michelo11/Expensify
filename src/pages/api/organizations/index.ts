import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const members = await prisma.member.findMany({
    where: {
      userId: session.user!.id,
    },
    include: {
      organization: true,
    },
  });

  const organizations = members.map((member) => member.organization);
  res.json(organizations);
}
