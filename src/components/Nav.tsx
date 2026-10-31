"use client";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { useNearWallet } from "@/context/NearWallet";

export default function Nav() {
  const { accountId, connect, disconnect, ready } = useNearWallet();
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
      >
        <span className="grid h-7 w-7 place-items-center rounded-md bg-accent font-mono text-sm text-night">
          ₦
        </span>
        NairaRails
      </Link>
      <nav className="flex items-center gap-4 text-sm text-mute">
        <Link href="/docs" className="hover:text-ink">
          Docs
        </Link>
        <a href="https://github.com/Esimuda/nairarails" className="hover:text-ink">
          GitHub
        </a>
        {accountId ? (
          <button
            type="button"
            onClick={() => void disconnect()}
            className="inline-flex max-w-[160px] items-center gap-1.5 truncate rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent"
            title={`Disconnect ${accountId}`}
          >
            <Wallet size={14} />
            {accountId}
          </button>
        ) : (
          <button
            type="button"
            onClick={connect}
            disabled={!ready}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs hover:text-ink disabled:opacity-50"
          >
            <Wallet size={14} />
            Connect
          </button>
        )}
      </nav>
    </header>
  );
}
