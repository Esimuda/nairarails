"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WalletSelector } from "@near-wallet-selector/core";
import type { WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { Buffer } from "buffer";
import { CONTRACT_ID, NETWORK } from "@/lib/near";

type NearWalletCtx = {
  ready: boolean;
  accountId: string | null;
  selector: WalletSelector | null;
  connect: () => void;
  disconnect: () => Promise<void>;
  signIntent: (payload: {
    intentId: string;
    ngn: number;
    usdc: number;
    billerId: string;
  }) => Promise<{ signature: string; accountId: string }>;
};

const Ctx = createContext<NearWalletCtx | null>(null);

export function useNearWallet() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNearWallet must be used inside NearWalletProvider");
  return v;
}

export function NearWalletProvider({ children }: { children: ReactNode }) {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      const { setupWalletSelector } = await import("@near-wallet-selector/core");
      const { setupModal } = await import("@near-wallet-selector/modal-ui");
      const { setupMyNearWallet } = await import(
        "@near-wallet-selector/my-near-wallet"
      );
      const { setupHereWallet } = await import(
        "@near-wallet-selector/here-wallet"
      );
      const sel = await setupWalletSelector({
        network: NETWORK,
        modules: [setupMyNearWallet(), setupHereWallet()],
      });
      const mod = setupModal(sel, {
        contractId: CONTRACT_ID,
        theme: "dark",
        description: "Connect to sign NairaRails bill-pay intents on NEAR.",
      });
      if (cancelled) return;

      setSelector(sel);
      setModal(mod);

      const sync = () => {
        const accounts = sel.store.getState().accounts;
        setAccountId(accounts.find((a) => a.active)?.accountId ?? accounts[0]?.accountId ?? null);
      };
      sync();
      unsubscribe = sel.store.observable.subscribe(sync).unsubscribe;
      setReady(true);
    })().catch((e) => {
      console.error("NEAR wallet selector init failed", e);
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  const connect = useCallback(() => {
    modal?.show();
  }, [modal]);

  const disconnect = useCallback(async () => {
    if (!selector) return;
    try {
      const wallet = await selector.wallet();
      await wallet.signOut();
    } catch (e) {
      console.error(e);
    }
    setAccountId(null);
  }, [selector]);

  const signIntent = useCallback(
    async (payload: {
      intentId: string;
      ngn: number;
      usdc: number;
      billerId: string;
    }) => {
      if (!selector || !accountId) {
        throw new Error("Connect a NEAR wallet first");
      }
      const wallet = await selector.wallet();
      const message = JSON.stringify({
        app: "NairaRails",
        action: "pay_bill_intent",
        ...payload,
        network: NETWORK,
        ts: Date.now(),
      });
      const nonce = Buffer.alloc(32);
      crypto.getRandomValues(nonce);

      if (typeof wallet.signMessage !== "function") {
        throw new Error("Connected wallet cannot sign messages");
      }
      const signed = await wallet.signMessage({
        message,
        recipient: CONTRACT_ID,
        nonce,
      });
      if (!signed?.signature) throw new Error("Wallet did not return a signature");
      return {
        signature: signed.signature,
        accountId: signed.accountId || accountId,
      };
    },
    [selector, accountId],
  );

  const value = useMemo(
    () => ({ ready, accountId, selector, connect, disconnect, signIntent }),
    [ready, accountId, selector, connect, disconnect, signIntent],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
