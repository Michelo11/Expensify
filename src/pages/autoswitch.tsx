import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import prisma from "@/lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  let organization = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          userId: session.user?.id,
        },
      },
    },
  });
  if (!organization) {
    organization = await prisma.organization.create({
      data: {
        name: session.user!.name || "Personal",
        avatarUrl: session.user!.image,
        members: {
          create: {
            userId: session.user!.id,
          },
        },
      },
    });
  }
  return {
    redirect: {
      destination: `/${organization.id}/dashboard`,
      permanent: false,
    },
  };
};

export default function AutoSwitch() {
  return null;
}