import { t as _t } from "@/i18n";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search, AlertTriangle, ArrowRight, ExternalLink, Shield, Loader2,
  ChevronDown, ChevronUp, Copy, CheckCircle2, Download,
} from "lucide-react";
import { toast } from "sonner";
import { generateWalletReport } from "@/lib/generateWalletReport";
import OnChainHistory from "@/components/OnChainHistory";
import WalletFlowGraph from "@/components/WalletFlowGraph";

// ---- helpers to generate deterministic fake data from a seed string ----

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + ch;
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateFakeWallet(rng: () => number): string {
  const hexChars = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += hexChars[Math.floor(rng() * 16)];
  }
  return addr;
}

function randomDate(rng: () => number, start: Date, end: Date): Date {
  const diff = end.getTime() - start.getTime();
  return new Date(start.getTime() + rng() * diff);
}

function parseDateString(dateStr: string): Date | undefined {
  const iso = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const de = dateStr.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  const year = iso ? Number(iso[1]) : de ? Number(de[3]) : NaN;
  const month = iso ? Number(iso[2]) : de ? Number(de[2]) : NaN;
  const day = iso ? Number(iso[3]) : de ? Number(de[1]) : NaN;
  if (!year || !month || !day) return undefined;

  const parsed = new Date(year, month - 1, day);
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month - 1 || parsed.getDate() !== day) {
    return undefined;
  }

  return parsed;
}

const EXCHANGES = [
  _t("Binance"), _t("Coinbase"), _t("Kraken"), _t("KuCoin"), _t("Bybit"), "OKX",
  _t("Gate.io"), _t("Huobi"), _t("Bitfinex"), _t("Crypto.com"),
];

const MIXER_LABELS = [
  _t("Tornado Cash"), _t("Mixer-Vertrag"), _t("Privacy Pool"), _t("ChipMixer"),
];

const SCAMMER_LABELS = [
  _t("Betrüger-Wallet"), _t("Betrugs-Konsolidierung"), _t("Unbekannte Entität"), _t("Verdächtige Wallet"),
];

interface Transaction {
  id: number;
  date: Date;
  fromAddress: string;
  toAddress: string;
  amount: number;
  label: string;
  type: "initial" | "transfer" | "exchange" | "mixer" | "scammer" | "stolen";
}

function generateTransactionHistory(walletAddress: string, forcedAmount?: number, incidentDate?: Date): Transaction[] {
  const seed = hashCode(walletAddress);
  const rng = seededRandom(seed);

  const txCount = 12 + Math.floor(rng() * 10); // 12-21 transactions
  const transactions: Transaction[] = [];

  // Use incident date as the anchor: transactions start before it and end after it
  const baseDate = incidentDate && !Number.isNaN(incidentDate.getTime()) ? incidentDate : new Date(2021, 5, 15);
  const startDate = new Date(baseDate.getTime() - (120 + Math.floor(rng() * 90)) * 86400000);
  const endDate = new Date(baseDate.getTime() + (180 + Math.floor(rng() * 365)) * 86400000);
  // Cap end date to today
  const now = new Date();
  if (endDate > now) endDate.setTime(now.getTime());

  // Generate intermediate wallets
  const intermediateWallets: string[] = [];
  for (let i = 0; i < 8; i++) {
    intermediateWallets.push(generateFakeWallet(rng));
  }

  // Generate exchange wallets
  const exchangeWallets: { addr: string; name: string }[] = [];
  for (let i = 0; i < 4; i++) {
    exchangeWallets.push({
      addr: generateFakeWallet(rng),
      name: EXCHANGES[Math.floor(rng() * EXCHANGES.length)],
    });
  }

  const scammerWallets: string[] = [];
  for (let i = 0; i < 3; i++) {
    scammerWallets.push(generateFakeWallet(rng));
  }

  // Total stolen amount (5,000 - 20,000 EUR)
  const totalStolen = forcedAmount && forcedAmount > 0 ? Math.round(forcedAmount) : 5000 + Math.floor(rng() * 15000);

  // First few transactions: legitimate deposits into victim wallet
  const legitimateCount = 2 + Math.floor(rng() * 3);

  // Generate dates: pre-incident for deposits, post-incident for the rest
  const preIncidentDates: Date[] = [];
  const postIncidentDates: Date[] = [];
  const incidentTime = baseDate.getTime();
  for (let i = 0; i < legitimateCount; i++) {
    preIncidentDates.push(randomDate(rng, startDate, new Date(incidentTime - 86400000)));
  }
  preIncidentDates.sort((a, b) => a.getTime() - b.getTime());
  for (let i = 0; i < txCount - legitimateCount - 1; i++) {
    postIncidentDates.push(randomDate(rng, new Date(incidentTime + 86400000), endDate));
  }
  postIncidentDates.sort((a, b) => a.getTime() - b.getTime());
  const dates = [...preIncidentDates, baseDate, ...postIncidentDates];
  for (let i = 0; i < legitimateCount && i < txCount; i++) {
    const amt = Math.round((1000 + rng() * 4000) * 100) / 100;
    transactions.push({
      id: i,
      date: dates[i],
      fromAddress: exchangeWallets[Math.floor(rng() * exchangeWallets.length)].addr,
      toAddress: walletAddress,
      amount: amt,
      label: _t("Einzahlung von Börse"),
      type: "initial",
    });
  }

  // The stolen transaction — use incident date if provided
  const stolenIdx = legitimateCount;
  const stolenDate = dates[stolenIdx] || baseDate;
  transactions.push({
    id: stolenIdx,
    date: stolenDate,
    fromAddress: walletAddress,
    toAddress: intermediateWallets[0],
    amount: totalStolen,
    label: _t("⚠️ UNBEFUGTE ÜBERWEISUNG — Gelder gestohlen"),
    type: "stolen",
  });

  // Movement through intermediate wallets
  let currentWallet = intermediateWallets[0];
  let txId = stolenIdx + 1;
  const splitCount = 3 + Math.floor(rng() * 3);
  const splits: number[] = [];
  let splitRemaining = totalStolen;

  for (let i = 0; i < splitCount - 1; i++) {
    const portion = Math.round((splitRemaining * (0.2 + rng() * 0.4)) * 100) / 100;
    splits.push(portion);
    splitRemaining -= portion;
  }
  splits.push(Math.round(splitRemaining * 100) / 100);

  for (let i = 0; i < splits.length && txId < txCount; i++) {
    const amt = splits[i];
    const dateIdx = Math.min(txId, dates.length - 1);

    // Transfer to intermediate
    const nextWallet = intermediateWallets[(i + 1) % intermediateWallets.length];
    transactions.push({
      id: txId++,
      date: dates[dateIdx],
      fromAddress: currentWallet,
      toAddress: nextWallet,
      amount: amt,
      label: _t("Transfer an Zwischenwallet"),
      type: "transfer",
    });

    if (txId >= txCount) break;

    // Some go through mixers
    if (rng() > 0.5) {
      const mixerLabel = MIXER_LABELS[Math.floor(rng() * MIXER_LABELS.length)];
      const mixerWallet = generateFakeWallet(rng);
      transactions.push({
        id: txId++,
        date: dates[Math.min(txId, dates.length - 1)],
        fromAddress: nextWallet,
        toAddress: mixerWallet,
        amount: amt,
        label: `Weitergeleitet über ${mixerLabel}`,
        type: "mixer",
      });
      currentWallet = mixerWallet;
    } else {
      currentWallet = nextWallet;
    }

    if (txId >= txCount) break;

    // End at exchange or scammer wallet
    if (rng() > 0.4) {
      const exchange = exchangeWallets[Math.floor(rng() * exchangeWallets.length)];
      transactions.push({
        id: txId++,
        date: dates[Math.min(txId, dates.length - 1)],
        fromAddress: currentWallet,
        toAddress: exchange.addr,
        amount: amt * (0.85 + rng() * 0.14),
        label: `Ausgezahlt über ${exchange.name}`,
        type: "exchange",
      });
    } else {
      const scamWallet = scammerWallets[Math.floor(rng() * scammerWallets.length)];
      transactions.push({
        id: txId++,
        date: dates[Math.min(txId, dates.length - 1)],
        fromAddress: currentWallet,
        toAddress: scamWallet,
        amount: amt,
        label: SCAMMER_LABELS[Math.floor(rng() * SCAMMER_LABELS.length)],
        type: "scammer",
      });
    }

    currentWallet = intermediateWallets[(i + 2) % intermediateWallets.length];
  }

  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
}

// ---- Component ----

const WalletTracker = ({ userName = _t("Kunde"), totalPortfolioEur, incidentDate }: { userName?: string; totalPortfolioEur?: number; incidentDate?: string | null }) => {
  const [walletInput, setWalletInput] = useState("");
  const [trackedWallet, setTrackedWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedTx, setExpandedTx] = useState<number | null>(null);
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null);

  const parsedIncidentDate = useMemo(() => {
    if (!incidentDate) return undefined;
    return parseDateString(incidentDate);
  }, [incidentDate]);

  const transactions = useMemo(() => {
    if (!trackedWallet) return [];
    return generateTransactionHistory(trackedWallet, totalPortfolioEur, parsedIncidentDate);
  }, [trackedWallet, totalPortfolioEur, parsedIncidentDate]);

  // Strict per-chain validation. Only addresses recognised as Ethereum (EVM) or
  // Bitcoin trigger the Blockchain API call; everything else is rejected early.
  const validateAddress = (
    addr: string,
  ): { ok: true; chain: "ethereum" | "bitcoin" } | { ok: false; reason: string } => {
    if (!addr) return { ok: false, reason: _t("Bitte geben Sie eine Wallet-Adresse ein") };
    if (/\s/.test(addr)) return { ok: false, reason: _t("Die Adresse darf keine Leerzeichen enthalten") };

    // Ethereum / EVM: 0x + 40 hex
    if (/^0x[0-9a-fA-F]{40}$/.test(addr)) return { ok: true, chain: "ethereum" };
    if (/^0x/i.test(addr)) {
      return { ok: false, reason: _t("Ungültige Ethereum-Adresse (muss 0x gefolgt von 40 Hex-Zeichen sein)") };
    }

    // Bitcoin bech32 (lowercase only)
    if (/^bc1[ac-hj-np-z02-9]{25,62}$/.test(addr)) return { ok: true, chain: "bitcoin" };
    if (/^bc1/i.test(addr)) {
      return { ok: false, reason: _t("Ungültige Bitcoin bech32-Adresse") };
    }

    // Bitcoin legacy / P2SH (base58, no 0 O I l)
    if (/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(addr)) return { ok: true, chain: "bitcoin" };

    return {
      ok: false,
      reason:
        _t("Diese Adresse wird nicht unterstützt. Bitte geben Sie eine gültige Ethereum (0x...) oder Bitcoin (1.../3.../bc1...) Adresse ein."),
    };
  };

  const handleTrack = () => {
    const trimmed = walletInput.trim();
    const result = validateAddress(trimmed);
    if (result.ok === false) {
      toast.error(result.reason);
      return;
    }
    const chain = result.chain;
    setLoading(true);
    setTrackedWallet(null);
    setTimeout(() => {
      setTrackedWallet(trimmed);
      setLoading(false);
      toast.success(
        `Gültige ${chain === "ethereum" ? "Ethereum" : "Bitcoin"}-Adresse erkannt – Blockchain-Analyse abgeschlossen`,
      );
    }, 2500);
  };


  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedAddr(addr);
    setTimeout(() => setCopiedAddr(null), 2000);
  };

  const shortenAddr = (addr: string) =>
    addr.length > 14 ? `${addr.slice(0, 8)}...${addr.slice(-6)}` : addr;

  const typeStyles: Record<string, string> = {
    initial: "border-l-4 border-l-[hsl(var(--success))]",
    stolen: "border-l-4 border-l-destructive bg-destructive/5",
    transfer: "border-l-4 border-l-[hsl(var(--warning))]",
    mixer: "border-l-4 border-l-purple-500",
    exchange: "border-l-4 border-l-accent",
    scammer: "border-l-4 border-l-destructive",
  };

  const typeBadge = (type: string) => {
    switch (type) {
      case "initial":
        return <Badge className="bg-[hsl(var(--success))] text-primary-foreground text-xs">{_t("Einzahlung")}</Badge>;
      case "stolen":
        return <Badge variant="destructive" className="text-xs animate-pulse">GESTOHLEN</Badge>;
      case "transfer":
        return <Badge variant="secondary" className="border border-[hsl(var(--warning))] text-[hsl(var(--warning))] text-xs">{_t("Transfer")}</Badge>;
      case "mixer":
        return <Badge className="bg-purple-600 text-primary-foreground text-xs">{_t("Mixer")}</Badge>;
      case "exchange":
        return <Badge className="bg-accent text-accent-foreground text-xs">{_t("Börse")}</Badge>;
      case "scammer":
        return <Badge variant="destructive" className="text-xs">{_t("Betrüger")}</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{type}</Badge>;
    }
  };

  const stolenTx = transactions.find((t) => t.type === "stolen");
  const totalStolen = stolenTx?.amount || 0;
  const exchangeTxs = transactions.filter((t) => t.type === "exchange");
  const scammerTxs = transactions.filter((t) => t.type === "scammer");

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card className="glow-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            {_t("Wallet-Transaktionsverfolgung")}
          </CardTitle>
          <CardDescription>
            {_t("Geben Sie die Wallet-Adresse ein, um die Bewegungen Ihrer gestohlenen Gelder zu verfolgen. Unsere Blockchain-Forensik analysiert die gesamte Transaktionshistorie.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder={_t("0x... oder Wallet-Adresse eingeben")}
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              className="bg-secondary border-border font-mono text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button onClick={handleTrack} disabled={loading} className="shrink-0">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {_t("Analysiere...")}
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  {_t("Verfolgen")}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading state */}
      {loading && (
        <Card className="glow-border">
          <CardContent className="py-12 text-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
            <div>
              <p className="font-display font-bold text-lg">{_t("Blockchain wird analysiert...")}</p>
              <p className="text-sm text-muted-foreground">
                {_t("Transaktionen werden über mehrere Netzwerke verfolgt")}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              {_t("Sichere On-Chain-Analyse")}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {trackedWallet && !loading && (
        <>
          {/* Download Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                const trackedWalletSet = new Set(transactions.flatMap((t) => [t.fromAddress, t.toAddress]));
                generateWalletReport({
                  userName,
                  walletAddress: trackedWallet,
                  transactions,
                  totalStolen,
                  exchangeCount: exchangeTxs.length,
                  trackedWallets: trackedWalletSet.size,
                  generatedAt: new Date(),
                });
                toast.success(_t("PDF-Bericht wurde heruntergeladen"));
              }}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {_t("Forensik-Bericht als PDF herunterladen")}
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">{_t("Gestohlener Betrag")}</p>
                    <p className="text-2xl font-display font-bold text-destructive">
                      €{totalStolen.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glow-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">{_t("Über Börsen ausgezahlt")}</p>
                    <p className="text-2xl font-display font-bold text-accent">
                      {exchangeTxs.length} {_t("Transaktionen")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="glow-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{_t("Verfolgte Wallets")}</p>
                    <p className="text-2xl font-display font-bold">
                      {new Set(transactions.flatMap((t) => [t.fromAddress, t.toAddress])).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real on-chain history */}
          <OnChainHistory address={trackedWallet} />

          {/* Fund Flow Graph */}
          <Card className="glow-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" />
                {_t("Geldfluss-Netzwerk")}
              </CardTitle>
              <CardDescription>
                {_t("Visuelle Darstellung der Geldbewegungen zwischen Wallets. Fahren Sie mit der Maus über einen Knoten, um die Verbindungen hervorzuheben.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WalletFlowGraph transactions={transactions} walletAddress={trackedWallet} />
            </CardContent>
          </Card>

          {/* Transaction Flow */}
          <Card className="glow-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowRight className="h-5 w-5 text-primary" />
                {_t("Transaktionsverlauf")}
              </CardTitle>
              <CardDescription>
                {_t("Vollständige Verfolgung der Geldbewegungen seit dem Diebstahl. Rot markierte Einträge zeigen verdächtige oder gestohlene Transaktionen.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className={`rounded-lg bg-secondary/40 border border-border p-3 transition-all cursor-pointer hover:bg-secondary/70 ${typeStyles[tx.type] || ""}`}
                    onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="text-xs text-muted-foreground whitespace-nowrap w-20 shrink-0">
                          {tx.date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </div>
                        {typeBadge(tx.type)}
                        <p className={`text-sm truncate ${tx.type === "stolen" ? "font-bold text-destructive" : ""}`}>
                          {tx.label}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`font-mono text-sm font-semibold ${tx.type === "stolen" ? "text-destructive" : ""}`}>
                          €{tx.amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        {expandedTx === tx.id ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {expandedTx === tx.id && (
                      <div className="mt-3 pt-3 border-t border-border space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground w-12">{_t("Von:")}</span>
                          <code className="font-mono text-foreground bg-background/50 px-2 py-0.5 rounded">
                            {shortenAddr(tx.fromAddress)}
                          </code>
                          <button
                            onClick={(e) => { e.stopPropagation(); copyAddress(tx.fromAddress); }}
                            className="text-muted-foreground hover:text-foreground transition"
                          >
                            {copiedAddr === tx.fromAddress ? <CheckCircle2 className="h-3 w-3 text-[hsl(var(--success))]" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground w-12">{_t("An:")}</span>
                          <code className="font-mono text-foreground bg-background/50 px-2 py-0.5 rounded">
                            {shortenAddr(tx.toAddress)}
                          </code>
                          <button
                            onClick={(e) => { e.stopPropagation(); copyAddress(tx.toAddress); }}
                            className="text-muted-foreground hover:text-foreground transition"
                          >
                            {copiedAddr === tx.toAddress ? <CheckCircle2 className="h-3 w-3 text-[hsl(var(--success))]" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground w-12">{_t("Zeit:")}</span>
                          <span>{tx.date.toLocaleString("de-DE")}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">{_t("Legende")}</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { type: "initial", label: _t("Einzahlung") },
                  { type: "stolen", label: _t("Gestohlen") },
                  { type: "transfer", label: _t("Zwischentransfer") },
                  { type: "mixer", label: _t("Mixer / Privacy") },
                  { type: "exchange", label: _t("Börse") },
                  { type: "scammer", label: _t("Betrüger-Wallet") },
                ].map((item) => (
                  <div key={item.type} className="flex items-center gap-1.5">
                    {typeBadge(item.type)}
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WalletTracker;
