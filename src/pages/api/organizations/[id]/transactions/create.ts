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
  const { amount, description, action } = req.body;

  if (!amount || !description || !action) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (description.length > 100) {
    return res
      .status(400)
      .json({ message: "Description must be max 100 characters" });
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

  if (!organization)
    return res.status(404).json({ message: "Organization not found" });

  const transaction = await prisma.transaction.create({
    data: {
      amount: Number(amount) || 0,
      description: description,
      action: action,
      organizationId: id as string,
    },
  });

  for (const member of organization.members) {
    await prisma.notification.create({
      data: {
        title: `${transaction.action} sent`,
        message: `Your organization ${organization.name} ${
          transaction.action === "WITHDRAW" ? "sent" : "received"
        } €${transaction.amount} for ${transaction.description}`,
        userId: member.userId,
      },
    });
  }

  return res.json(transaction);
}
