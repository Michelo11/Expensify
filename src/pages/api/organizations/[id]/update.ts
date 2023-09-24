import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

import nextConnect from "next-connect";
import multer from "multer";
import { put } from "@vercel/blob";

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));
apiRoute.post(async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.query;
  const { name } = req.body;
  const file = req.file;

  const org = await prisma.organization.findFirst({
    where: {
      id: id as string,
      members: {
        some: {
          userId: session.user!.id,
        },
      },
    },
  });

  if (!org) {
    return res.status(404).json({ message: "Organization not found" });
  }


    let avatarUrl;
  if (file) {
    const blob = await put(file.originalname, file.buffer, {
      access: "public",
    });
    avatarUrl = blob.url;
  }

  const organization = await prisma.organization.update({
    where: {
      id: id as string,
    },
    data: {
      name: name,
      avatarUrl: avatarUrl,
    },
  });

  res.json(organization);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
