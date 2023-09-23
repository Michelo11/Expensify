import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { IntegrationType } from "@prisma/client";
import { randomUUID } from "crypto";
import Stripe from "stripe";
import * as paypal from "@/lib/paypal";

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
    let webhookSecret;

    switch (type) {
      case "PAYPAL":
        try {
          const token = await paypal.login(
            clientId as string,
            clientSecret as string
          );

          await paypal.createWebhook(token, organization.id);
        } catch (e) {
          return res.status(400).json({ message: "Invalid credentials" });
        }


        break;
      case "STRIPE":
        try {
          const stripe = new Stripe(secret, {
            apiVersion: "2023-08-16",
          });
          const webhook = await stripe.webhookEndpoints.create({
            url: `${process.env.NEXTAUTH_URL}/api/webhooks/stripe/${organization.id}`,
            enabled_events: ["payment_intent.succeeded"],
          });
          webhookSecret = webhook.secret;
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
        webhookSecret,
        ready: type !== "API"
      },
    });

    return res.json({
      success: true,
      key: updatedOrganization.type === "API" ? secret : undefined,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid type" });
  }
}
