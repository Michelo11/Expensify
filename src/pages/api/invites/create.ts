import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";
import InviteMail from "@/components/emails/InviteMail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed, please use POST request" });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { email, organization } = req.body;
  if (!email || !organization) {
    return res.status(400).json({ error: "Missing email or organization" });
  }

  const org = await prisma.organization.findUnique({
    where: {
      id: organization,
      members: {
        some: {
          userId: session.user!.id,
        },
      },
    },
  });
  if (!org) {
    return res.status(401).json({ error: "Organization not found" });
  }

  const invite = await prisma.invite.create({
    data: {
      email,
      organization: {
        connect: {
          id: organization,
        },
      },
      inviter: {
        connect: {
          id: session.user!.id,
        },
      },
    },
  });

  resend.sendEmail({
    from: "Expensify <expensify@michelemanna.me>",
    to: [email],
    subject: "Invitation to join an Expensify organization",
    text: "",
    react: InviteMail({
      username: session.user!.name || session.user!.email || "User",
      userImage: session.user!.image,
      organization: org.name,
      organizationImage: org.avatarUrl,
      invite: invite.id,
    }),
  });
  res.status(200).json(invite);
}
