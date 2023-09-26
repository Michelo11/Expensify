import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: "Missing code" });
  }

  const invite = await prisma.invite.findUnique({
    where: {
      id: code as string,
    },
    include: {
      organization: true,
    },
  });

  if (!invite) {
    return res.status(404).json({ error: "Invite not found" });
  }

  const member = await prisma.member.create({
    data: {
      user: {
        connect: {
          id: session.user!.id,
        },
      },
      organization: {
        connect: {
          id: invite.organizationId,
        },
      },
    },
  });

  await prisma.invite.delete({
    where: {
      id: invite.id,
    },
  });

  await prisma.notification.create({
    data: {
      title: "Invited accepted",
      message: `${session.user!.name} has accepted your invite to join ${
        invite.organization.name
      }`,
      userId: invite.inviterId,
    },
  });

  return res
    .setHeader("Location", `/${invite.organizationId}/dashboard`)
    .status(302)
    .json(member);
}
