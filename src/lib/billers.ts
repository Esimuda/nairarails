export type Category = "electricity" | "airtime" | "tv";
export type Biller = { id: string; name: string; short: string; category: Category; field: string; placeholder: string; presets: number[] };

export const CATEGORIES: { id: Category; label: string; hint: string }[] = [
  { id: "electricity", label: "Electricity", hint: "Prepaid token" },
  { id: "airtime", label: "Airtime", hint: "All networks" },
  { id: "tv", label: "Cable TV", hint: "DStv · GOtv" },
];

export const BILLERS: Biller[] = [
  { id: "ikedc", name: "Ikeja Electric", short: "IKEDC", category: "electricity", field: "Meter number", placeholder: "4501 2238 917", presets: [5000, 10000, 20000, 50000] },
  { id: "ekedc", name: "Eko Electricity", short: "EKEDC", category: "electricity", field: "Meter number", placeholder: "0101 8873 445", presets: [5000, 10000, 20000, 50000] },
  { id: "aedc", name: "Abuja Electricity", short: "AEDC", category: "electricity", field: "Meter number", placeholder: "4500 0912 331", presets: [5000, 10000, 25000] },
  { id: "mtn", name: "MTN Nigeria", short: "MTN", category: "airtime", field: "Phone number", placeholder: "0803 412 7781", presets: [500, 1000, 2000, 5000] },
  { id: "airtel", name: "Airtel Nigeria", short: "Airtel", category: "airtime", field: "Phone number", placeholder: "0802 551 9032", presets: [500, 1000, 2000, 5000] },
  { id: "glo", name: "Glo", short: "Glo", category: "airtime", field: "Phone number", placeholder: "0805 330 1284", presets: [500, 1000, 2000] },
  { id: "dstv", name: "DStv", short: "DStv", category: "tv", field: "Smartcard number", placeholder: "7023 4418 92", presets: [19000, 29500, 44500] },
  { id: "gotv", name: "GOtv", short: "GOtv", category: "tv", field: "IUC number", placeholder: "2019 7731 04", presets: [6800, 11400, 16800] },
];

export const RECENT = [
  { who: "Adaeze · Yaba", what: "IKEDC token", ngn: 20000, usdc: 12.94, ago: "2m" },
  { who: "Tunde · Wuse II", what: "AEDC token", ngn: 10000, usdc: 6.47, ago: "6m" },
  { who: "Kemi · Lekki", what: "DStv Compact", ngn: 19000, usdc: 12.29, ago: "11m" },
  { who: "Ibrahim · Kano", what: "MTN airtime", ngn: 2000, usdc: 1.29, ago: "14m" },
];
