import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Expensify</title>
      </Head>
      <main className="flex flex-col min-h-screen px-3">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </SessionProvider>
  );
}
