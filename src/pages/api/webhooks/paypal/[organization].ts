import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import * as paypal from "@/lib/paypal";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { organization: id } = req.query;
  const body = req.body;

  const organization = await prisma.organization.findUnique({
    where: {
      id: id as string,
    },
    include: {
      members: true,
    },
  });

  if (!organization || !organization.clientSecret || !organization.clientId) {
    return res.status(404).json({ message: "Organization not found" });
  }

  const token = await paypal.login(
    organization.clientId,
    organization.clientSecret
  );
  const verified = await paypal.verifyWebhook(token, body);
  if (!verified) {
    return res.status(400).json({ message: "Webhook not verified" });
  }

  const date = body.create_time;
  const amountValue = body.resource.net_amount.value;

  await prisma.transaction.create({
    data: {
      description: "PayPal payment",
      amount: Number(amountValue),
      createdAt: new Date(date),
      action: "DEPOSIT",
      organizationId: id as string,
    },
  });

  for (const member of organization.members) {
    await prisma.notification.create({
      data: {
        title: "Deposit received",
        message: `You have received a deposit of €${amountValue} from PayPal for ${organization.name}`,
        userId: member.userId,
      },
    });
  }

  return res.status(200).json({ received: true });
};

export default handler;