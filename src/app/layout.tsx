import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const tight = Inter_Tight({ subsets: ["latin"], variable: "--font-tight" });

export const metadata: Metadata = {
  title: "NairaRails — Pay Nigerian bills in USDC on NEAR",
  description:
    "Electricity, airtime and DStv paid with stablecoins through NEAR Intents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable} ${tight.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
