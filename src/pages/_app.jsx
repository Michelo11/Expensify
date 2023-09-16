import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Expensify</title>
      </Head>
      <main className="flex flex-col min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
