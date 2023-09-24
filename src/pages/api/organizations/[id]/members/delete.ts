import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const { id, member } = req.query;

  if (!member) {
    return res.status(400).json({ message: "Member not found" });
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
    include: {
      members: true,
    },
  });

  if (!organization) {
    return res.status(404).json({ message: "Organization not found" });
  }

  if (organization.members.length === 1) {
    return res.status(400).json({ message: "Cannot remove last member" });
  }

  await prisma.member.deleteMany({
    where: {
      organizationId: id as string,
      userId: member as string,
    },
  });

  return res.json(organization);
}
