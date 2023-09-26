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
  const { id: organizationId } = req.query;
  const { id, amount, description, action } = req.body;

  if (!id || !amount || !description || !action) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (description.length > 100) {
    return res
      .status(400)
      .json({ message: "Description must be max 100 characters" });
  }

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId as string,
      members: {
        some: {
          userId: session.user!.id,
        },
      },
    }
  });

  if (!organization)
    return res.status(404).json({ message: "Organization not found" });

  const transaction = await prisma.transaction.update({
    where: {
        id: id as string,
    },
    data: {
      amount: Number(amount) || 0,
      description: description,
      action: action,
    },
  });

  return res.json(transaction);
}
