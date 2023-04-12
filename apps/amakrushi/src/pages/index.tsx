import type { NextPage } from "next";
import Head from "next/head";
import { CookiesProvider } from "react-cookie";
import { ColorModeScript } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ChatUiWindow = dynamic(
  () => import("../components/PhoneView/ChatWindow/ChatUiWindow"),
  { ssr: false }
);

const Home: NextPage  = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="white" />
        <meta name="UCI Web Channel" content="A project under C4GT" />
        <title>Ama KrushAI</title>
      </Head>
      <CookiesProvider>
        <ChatUiWindow />
      <ColorModeScript />
      </CookiesProvider>
    </>
  );
};
export default Home;
