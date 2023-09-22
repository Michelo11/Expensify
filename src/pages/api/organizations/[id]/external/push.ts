import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { authorization } = req.headers;
  const organization = await prisma.organization.findUnique({
    where: {
      id: id as string,
      clientSecret: authorization,
    },
  });
  if (!organization)
    return res.status(404).json({ message: "Organization not found" });
  const { transactions } = req.body;

  try {
    const mapped = transactions.map((transaction: any) => ({
      description: transaction.description,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      action: transaction.action,
      organizationId: organization.id,
    }));

    await prisma.transaction.createMany({
      data: mapped,
      skipDuplicates: true,
    });
    return res.json({ message: "OK", data: mapped });
  } catch (error) {
    return res.status(400).json({ message: "Invalid data" });
  }
}
