import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { IntegrationType } from "@prisma/client";
import { randomUUID } from "crypto";
import Stripe from "stripe";

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

    switch (type) {
      case "PAYPAL":
          const r = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(
                `${clientId}:${secret}`
              ).toString("base64")}`,
            },
            body: "grant_type=client_credentials",
          });

        if (r.status !== 200) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        break;
      case "STRIPE":
        try {
          const stripe = new Stripe(secret, {
            apiVersion: "2023-08-16",
          });
          await stripe.accounts.list();
        } catch (err) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        break;
    }

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
    return res.status(400).json({ message: "Invalid type" });
  }
}
