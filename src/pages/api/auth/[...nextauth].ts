import NextAuth, { type AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import WelcomeMail from "@/components/emails/WelcomeMail";
import prisma from "@/lib/prisma";
import resend from "@/lib/resend";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      const prismaUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (!prismaUser?.emailSent && user.email) {
        resend.sendEmail({
          from: "Expensify <expensify@michelemanna.me>",
          to: [user.email],
          subject: "Welcome to Expensify!",
          text: "",
          react: WelcomeMail({
            name: user.name || user.email,
          }),
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { emailSent: true },
        });
      }
      return true;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
