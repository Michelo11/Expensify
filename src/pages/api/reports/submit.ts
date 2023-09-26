import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import ReportMail from "@/components/emails/ReportMail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = auth.replace("Bearer ", "");

  if (token !== process.env.BACKEND_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const organizations = await prisma.organization.findMany({
    include: {
      members: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  for (const organization of organizations) {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1);

    const transactions = await prisma.transaction.findMany({
      where: {
        organizationId: organization.id,
        createdAt: {
          gte: lastMonth,
        },
      },
    });

    let saved = 0;
    let spent = 0;

    for (const transaction of transactions) {
      if (transaction.action === "DEPOSIT") {
        saved += transaction.amount;
      } else {
        spent += transaction.amount;
      }
    }

    const balance = saved - spent;
    const emails = organization.members
        .filter((member) => member.user.email !== null)
        .map((member) => member.user.email!)


    const data = await resend.sendEmail({
      from: "Expensify <expensify@michelemanna.me>",
      to: emails,
      subject: `Your last month for ${organization.name}`,
      text: "",
      react: ReportMail({
        organization: organization.name,
        balance,
        saved,
        spent,
      }),
    });
  }

  res.json({
    success: true
  })
};
