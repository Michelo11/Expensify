import { Inter } from "next/font/google";
import Landing from "@/components/Landing";
import { useSession } from "next-auth/react";
import router from "next/router";

import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/autoswitch",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <main className={`h-full my-auto ${inter.className}`}>
      <Landing />
    </main>
  );
}
