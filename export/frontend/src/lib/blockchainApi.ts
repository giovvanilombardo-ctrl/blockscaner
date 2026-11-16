// Free public blockchain APIs — no key required.
// ETH/EVM: Blockscout v2  (https://eth.blockscout.com)
// BTC:     Blockstream.info  (https://blockstream.info/api)

export type Chain = "ethereum" | "bitcoin" | "unknown";

export interface OnChainTx {
  hash: string;
  timestamp: Date | null;
  from: string;
  to: string;
  valueFormatted: string; // e.g. "0.1234 ETH"
  valueRaw: number;
  symbol: string;
  direction: "in" | "out" | "self";
  status: "success" | "failed" | "pending";
  explorerUrl: string;
}

export interface AddressSummary {
  chain: Chain;
  address: string;
  balanceFormatted: string;
  txCount: number;
  explorerUrl: string;
}

export function detectChain(addr: string): Chain {
  if (/^0x[0-9a-fA-F]{40}$/.test(addr)) return "ethereum";
  if (/^(bc1[a-zA-HJ-NP-Z0-9]{25,62}|[13][a-km-zA-HJ-NP-Z1-9]{24,33})$/.test(addr)) return "bitcoin";
  return "unknown";
}

// ---------- Ethereum (Blockscout) ----------

async function fetchEth(addr: string): Promise<{ summary: AddressSummary; txs: OnChainTx[] }> {
  const base = "https://eth.blockscout.com/api/v2";
  const explorer = `https://etherscan.io/address/${addr}`;

  const [infoRes, txRes] = await Promise.all([
    fetch(`${base}/addresses/${addr}`),
    fetch(`${base}/addresses/${addr}/transactions`),
  ]);

  if (!infoRes.ok) throw new Error(`Blockscout address lookup failed (${infoRes.status})`);
  if (!txRes.ok) throw new Error(`Blockscout transactions lookup failed (${txRes.status})`);

  const info = await infoRes.json();
  const txJson = await txRes.json();

  const balanceWei = BigInt(info.coin_balance ?? "0");
  const balanceEth = Number(balanceWei) / 1e18;

  const items = Array.isArray(txJson.items) ? txJson.items : [];
  const txs: OnChainTx[] = items.slice(0, 50).map((t: any) => {
    const from = t.from?.hash ?? "";
    const to = t.to?.hash ?? "";
    const valEth = Number(BigInt(t.value ?? "0")) / 1e18;
    const lower = addr.toLowerCase();
    const direction =
      from.toLowerCase() === lower && to.toLowerCase() === lower
        ? "self"
        : from.toLowerCase() === lower
        ? "out"
        : "in";
    return {
      hash: t.hash,
      timestamp: t.timestamp ? new Date(t.timestamp) : null,
      from,
      to,
      valueRaw: valEth,
      valueFormatted: `${valEth.toLocaleString("de-DE", { maximumFractionDigits: 6 })} ETH`,
      symbol: "ETH",
      direction,
      status: t.status === "ok" ? "success" : t.status === "error" ? "failed" : "pending",
      explorerUrl: `https://etherscan.io/tx/${t.hash}`,
    };
  });

  return {
    summary: {
      chain: "ethereum",
      address: addr,
      balanceFormatted: `${balanceEth.toLocaleString("de-DE", { maximumFractionDigits: 6 })} ETH`,
      txCount: Number(info.transactions_count ?? items.length),
      explorerUrl: explorer,
    },
    txs,
  };
}

// ---------- Bitcoin (Blockstream) ----------

async function fetchBtc(addr: string): Promise<{ summary: AddressSummary; txs: OnChainTx[] }> {
  const base = "https://blockstream.info/api";
  const explorer = `https://blockstream.info/address/${addr}`;

  const [infoRes, txRes] = await Promise.all([
    fetch(`${base}/address/${addr}`),
    fetch(`${base}/address/${addr}/txs`),
  ]);

  if (!infoRes.ok) throw new Error(`Blockstream address lookup failed (${infoRes.status})`);
  if (!txRes.ok) throw new Error(`Blockstream transactions lookup failed (${txRes.status})`);

  const info = await infoRes.json();
  const txList = await txRes.json();

  const funded = info.chain_stats?.funded_txo_sum ?? 0;
  const spent = info.chain_stats?.spent_txo_sum ?? 0;
  const balanceBtc = (funded - spent) / 1e8;
  const txCount = info.chain_stats?.tx_count ?? 0;

  const txs: OnChainTx[] = (txList as any[]).slice(0, 50).map((t) => {
    const inputs: any[] = t.vin ?? [];
    const outputs: any[] = t.vout ?? [];
    const spentByAddr = inputs
      .filter((i) => i.prevout?.scriptpubkey_address === addr)
      .reduce((s, i) => s + (i.prevout?.value ?? 0), 0);
    const receivedByAddr = outputs
      .filter((o) => o.scriptpubkey_address === addr)
      .reduce((s, o) => s + (o.value ?? 0), 0);
    const net = receivedByAddr - spentByAddr;
    const direction: OnChainTx["direction"] = net > 0 ? "in" : net < 0 ? "out" : "self";
    const valBtc = Math.abs(net) / 1e8;

    const counterparty =
      direction === "in"
        ? inputs[0]?.prevout?.scriptpubkey_address ?? "—"
        : outputs.find((o) => o.scriptpubkey_address !== addr)?.scriptpubkey_address ?? "—";

    return {
      hash: t.txid,
      timestamp: t.status?.block_time ? new Date(t.status.block_time * 1000) : null,
      from: direction === "in" ? counterparty : addr,
      to: direction === "in" ? addr : counterparty,
      valueRaw: valBtc,
      valueFormatted: `${valBtc.toLocaleString("de-DE", { maximumFractionDigits: 8 })} BTC`,
      symbol: "BTC",
      direction,
      status: t.status?.confirmed ? "success" : "pending",
      explorerUrl: `https://blockstream.info/tx/${t.txid}`,
    };
  });

  return {
    summary: {
      chain: "bitcoin",
      address: addr,
      balanceFormatted: `${balanceBtc.toLocaleString("de-DE", { maximumFractionDigits: 8 })} BTC`,
      txCount,
      explorerUrl: explorer,
    },
    txs,
  };
}

export async function fetchOnChainHistory(addr: string) {
  const chain = detectChain(addr);
  if (chain === "ethereum") return fetchEth(addr);
  if (chain === "bitcoin") return fetchBtc(addr);
  throw new Error("Diese Adresse wird derzeit nicht unterstützt. Unterstützt: Ethereum (0x...) und Bitcoin (1.../3.../bc1...).");
}
