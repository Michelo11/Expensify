import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import nextConnect from "next-connect";
import multer from "multer";
import { uploadImages } from "@/lib/images";

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("file"));
apiRoute.put(async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { name } = req.body;
  const file = req.file;

  if (!name) {
    return res.status(400).json({ message: "Invalid body" });
  }

  let avatarUrl;
  if (file) {
    const data = await uploadImages([file]);
    avatarUrl = process.env.NEXT_PUBLIC_IMAGES_URL + data[0].id;
  }

  const organization = await prisma.organization.create({
    data: {
      name: name,
      avatarUrl: avatarUrl,
      members: {
        create: {
          userId: session.user!.id,
        },
      },
    },
  });

  return res.json(organization);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
