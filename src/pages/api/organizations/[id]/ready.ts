import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { id } = req.query;

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

  if (!organization.type)
      return res.status(400).json({ message: "Unable to proceed" });

  await prisma.organization.update({
    where: {
      id: organization.id,
    },
    data: {
      ready: true,
    },
  });;

  return res.json({
    success: true,
  });;
}
