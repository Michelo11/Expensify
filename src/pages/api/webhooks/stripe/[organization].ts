import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { buffer } from "micro";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { organization: id } = req.query;
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  const organization = await prisma.organization.findUnique({
    where: {
      id: id as string,
    },
    include: {
      members: true,
    },
  });

  if (!organization || !organization.clientSecret) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const stripe = new Stripe(organization.clientSecret, {
    apiVersion: "2023-08-16",
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig as string,
      organization.webhookSecret as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    await prisma.transaction.create({
      data: {
        description: paymentIntent.description || "Stripe payment",
        amount: paymentIntent.amount,
        createdAt: new Date(paymentIntent.created * 1000),
        action: "DEPOSIT",
        organizationId: id as string,
      },
    });

    for (const member of organization.members) {
      await prisma.notification.create({
        data: {
          title: "Deposit received",
          message: `You have received a deposit of €${(
            paymentIntent.amount / 100
          ).toFixed(2)} from ${paymentIntent.description} for ${
            organization.name
          }`,
          userId: member.userId,
        },
      });
    }
  }

  return res.status(200).json({ received: true });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;