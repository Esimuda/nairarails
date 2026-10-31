export const NETWORK =
  (process.env.NEXT_PUBLIC_NEAR_NETWORK as "mainnet" | "testnet") || "mainnet";

/** Contract used for wallet access-key / modal; Intents deposit target. */
export const CONTRACT_ID =
  process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID || "intents.near";

export const APP_NAME = "NairaRails";
