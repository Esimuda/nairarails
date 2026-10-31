"use client";
import "@near-wallet-selector/modal-ui/styles.css";
import { NearWalletProvider } from "@/context/NearWallet";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <NearWalletProvider>{children}</NearWalletProvider>;
}
