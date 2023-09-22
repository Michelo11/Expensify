import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { IntegrationType } from "@prisma/client";
import { randomUUID } from "crypto";

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
  const { type, clientId, clientSecret } = req.body;
  if (!type) return res.status(400).json({ message: "Missing type" });

  try {
    const secret = type === "API" ? randomUUID() : clientSecret;

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: id as string,
      },
      data: {
        type: type as IntegrationType,
        clientId,
        clientSecret: secret,
      },
    });

    return res.json(updatedOrganization);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid type" });
  }
}
