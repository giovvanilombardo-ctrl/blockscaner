import { t as _t } from "@/i18n";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LogOut, Wallet, ArrowRightLeft, Building2, RefreshCw, Send, Search, AlertTriangle, Clock, CheckCircle, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import WalletTracker from "@/components/WalletTracker";

interface Balance {
  currency: string;
  balance: number;
}

interface BankDetails {
  bank_name: string;
  iban: string;
  bic: string;
  account_holder: string;
}

interface WithdrawalRequest {
  id: string;
  created_at: string;
  from_currency: string;
  amount: number;
  eur_amount: number | null;
  status: string;
  withdraw_type: string;
  wallet_address: string | null;
  exchange_name: string | null;
  fee_percentage: number | null;
  fee_amount: number | null;
  fee_paid: boolean;
}

const EXCHANGES = [
  { name: _t("Binance"), fee: 5.6 },
  { name: _t("Kraken"), fee: 5.7 },
  { name: _t("Coinbase"), fee: 5.8 },
  { name: _t("Bybit"), fee: 5.6 },
  { name: "OKX", fee: 5.7 },
  { name: _t("KuCoin"), fee: 5.8 },
  { name: _t("Bitfinex"), fee: 5.7 },
  { name: _t("Gate.io"), fee: 5.8 },
  { name: _t("Huobi"), fee: 5.6 },
  { name: _t("Crypto.com"), fee: 5.7 },
  { name: _t("Blockchain.com"), fee: 4.0 },
];

const BANKS = [
  { name: _t("Barclays"), fee: 4.0 },
  { name: "HSBC", fee: 5.6 },
  { name: _t("Lloyds Bank"), fee: 5.7 },
  { name: _t("NatWest"), fee: 5.8 },
  { name: _t("Standard Chartered"), fee: 5.6 },
  { name: _t("Royal Bank of Scotland"), fee: 5.7 },
  { name: _t("Santander UK"), fee: 5.8 },
];

const WALLET_VALIDATORS: Record<string, { regex: RegExp; label: string; example: string }> = {
  BTC: { regex: /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,62}$/, label: "Bitcoin", example: "bc1qxy2kgdygjrsqtzq2n0yrf..." },
  ETH: { regex: /^0x[0-9a-fA-F]{40}$/, label: "Ethereum", example: _t("0x71C7656EC7ab88b098defB...") },
  USDT: { regex: /^(0x[0-9a-fA-F]{40}|T[a-zA-Z0-9]{33})$/, label: _t("USDT (ERC-20/TRC-20)"), example: _t("0x... oder T...") },
  USDC: { regex: /^0x[0-9a-fA-F]{40}$/, label: _t("USDC (ERC-20)"), example: _t("0x71C7656EC7ab88b098defB...") },
  BNB: { regex: /^(0x[0-9a-fA-F]{40}|bnb1[a-z0-9]{38})$/, label: _t("BNB (BEP-20/BEP-2)"), example: _t("0x... oder bnb1...") },
  SOL: { regex: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/, label: _t("Solana"), example: _t("7xKXtg2CW87d97TXJSDpbD5j...") },
  XRP: { regex: /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/, label: _t("XRP Ledger"), example: _t("rN7iq5E1GLsNFPHQiJpB...") },
  ADA: { regex: /^(addr1|DdzFF)[a-zA-Z0-9]{50,}$/, label: _t("Cardano"), example: "addr1qx2fxv2umyhttkxyxp8x0..." },
  DOT: { regex: /^[1-9A-HJ-NP-Za-km-z]{46,48}$/, label: _t("Polkadot"), example: _t("1FRMM8PEiWXYax7rpS6X4X...") },
  DOGE: { regex: /^D[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{32}$/, label: _t("Dogecoin"), example: _t("DH5yaieqoZN36fDVciNyRueRG...") },
};

const validateWalletAddress = (currency: string, address: string): string | null => {
  const validator = WALLET_VALIDATORS[currency];
  if (!validator) return null; // no validator = accept any
  if (!validator.regex.test(address)) {
    return `Ungültige ${validator.label}-Adresse. Beispiel: ${validator.example}`;
  }
  return null;
};

const FALLBACK_RATES: Record<string, number> = {
  BTC: 82000, ETH: 3800, USDT: 0.92, USDC: 0.92, BNB: 590,
  SOL: 185, XRP: 2.10, ADA: 0.72, DOT: 7.2, DOGE: 0.17, EUR: 1,
};

const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin", ETH: "ethereum", USDT: "tether", USDC: "usd-coin", BNB: "binancecoin",
  SOL: "solana", XRP: "ripple", ADA: "cardano", DOT: "polkadot", DOGE: "dogecoin",
};

const fetchLiveRates = async (): Promise<Record<string, number>> => {
  try {
    const ids = Object.values(COINGECKO_IDS).join(",");
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=eur`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    const rates: Record<string, number> = { EUR: 1 };
    for (const [symbol, id] of Object.entries(COINGECKO_IDS)) {
      rates[symbol] = data[id]?.eur ?? FALLBACK_RATES[symbol] ?? 0;
    }
    return rates;
  } catch {
    return { ...FALLBACK_RATES };
  }
};

type DashTab = "portfolio" | "tracker";
type WithdrawType = "eur" | "crypto" | "swap" | "crypto_to_eur";

const UserDashboard = ({ onResetCookies }: { onResetCookies?: () => void }) => {
  const [cryptoEurRates, setCryptoEurRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bank_name: "", iban: "", bic: "", account_holder: "",
  });
  const [hasBankDetails, setHasBankDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [swapCurrency, setSwapCurrency] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [eurAmount, setEurAmount] = useState("");
  const [swapToCurrency, setSwapToCurrency] = useState("");
  const [savingBank, setSavingBank] = useState(false);
  const [submittingWithdrawal, setSubmittingWithdrawal] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [incidentDate, setIncidentDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<DashTab>("portfolio");
  const [withdrawType, setWithdrawType] = useState<WithdrawType>("eur");
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedExchange, setSelectedExchange] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalRequest[]>([]);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentDialogState, setPaymentDialogState] = useState<"question" | "paid" | "later">("question");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLiveRates().then(setCryptoEurRates);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/login"); return; }

    const { data: profile } = await supabase.from("profiles").select("full_name, incident_date").eq("id", user.id).single();
    setUserName(profile?.full_name || _t("Benutzer"));
    setUserEmail(user.email || "");
    setIncidentDate((profile as any)?.incident_date || null);

    const { data: balData } = await supabase.from("user_balances").select("currency, balance").eq("user_id", user.id);
    setBalances(balData?.map(b => ({ currency: b.currency, balance: Number(b.balance) })) || []);

    const { data: bankData } = await supabase.from("user_bank_details").select("bank_name, iban, bic, account_holder").eq("user_id", user.id).maybeSingle();
    if (bankData) { setBankDetails(bankData as BankDetails); setHasBankDetails(true); }

    const { data: wdData } = await supabase
      .from("withdrawal_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setWithdrawalHistory((wdData as unknown as WithdrawalRequest[]) || []);

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/login");
      else fetchData();
    });
    return () => { subscription.unsubscribe(); };
  }, [navigate, fetchData]);

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/login"); };

  const handleSaveBank = async () => {
    setSavingBank(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const payload = { ...bankDetails, user_id: user.id, updated_at: new Date().toISOString() };
    const { error } = hasBankDetails
      ? await supabase.from("user_bank_details").update(payload).eq("user_id", user.id)
      : await supabase.from("user_bank_details").insert(payload);
    setSavingBank(false);
    if (error) toast.error("Fehler beim Speichern der Bankdaten");
    else { toast.success(_t("Bankdaten gespeichert")); setHasBankDetails(true); }
  };

  const handleSwap = async () => {
    if (withdrawType === "eur") {
      // EUR bank withdrawal - user enters EUR amount
      if (!swapCurrency) { toast.error("Bitte wählen Sie eine Quell-Währung aus"); return; }
      if (!eurAmount || parseFloat(eurAmount) <= 0) { toast.error("Bitte geben Sie einen EUR-Betrag ein"); return; }
      if (!hasBankDetails || !bankDetails.iban) { toast.error("Bitte hinterlegen Sie zuerst Ihre Bankdaten"); return; }
      if (!selectedBank) { toast.error("Bitte wählen Sie eine Bank aus"); return; }

      const eurVal = parseFloat(eurAmount);
      const rate = cryptoEurRates[swapCurrency] || 1;
      const cryptoNeeded = eurVal / rate;
      const bal = balances.find(b => b.currency === swapCurrency);
      if (!bal || cryptoNeeded > bal.balance) { toast.error(`Unzureichendes ${swapCurrency}-Guthaben. Benötigt: ${cryptoNeeded.toFixed(8)} ${swapCurrency}`); return; }

      setSubmittingWithdrawal(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const bank = BANKS.find(b => b.name === selectedBank);
      const feePercentage = bank?.fee || 5.6;
      const feeAmount = eurVal * feePercentage / 100;

      const { error } = await supabase.from("withdrawal_requests").insert({
        user_id: user.id, from_currency: swapCurrency, amount: cryptoNeeded,
        eur_amount: eurVal, status: "pending_fee", withdraw_type: "eur",
        exchange_name: selectedBank, fee_percentage: feePercentage,
        fee_amount: feeAmount, fee_paid: false,
      } as any);

      if (error) { setSubmittingWithdrawal(false); toast.error("Auszahlungsanfrage konnte nicht gesendet werden"); return; }

      // Balance locking is handled server-side when the withdrawal request is inserted.

      setSubmittingWithdrawal(false);
      toast.success(`Auszahlungsanfrage gesendet: €${eurVal.toLocaleString("de-DE", { minimumFractionDigits: 2 })}`);
      setEurAmount(""); setSwapCurrency(""); setSelectedBank(""); fetchData();

    } else if (withdrawType === "crypto") {
      // Crypto wallet withdrawal
      if (!swapCurrency || !swapAmount) { toast.error("Bitte wählen Sie eine Währung und geben Sie einen Betrag ein"); return; }
      const bal = balances.find(b => b.currency === swapCurrency);
      const amount = parseFloat(swapAmount);
      if (!bal || amount <= 0 || amount > bal.balance) { toast.error("Ungültiger Betrag oder unzureichendes Guthaben"); return; }
      if (!walletAddress.trim()) { toast.error("Bitte geben Sie eine gültige Blockchain-Wallet-Adresse ein"); return; }
      const addrError = validateWalletAddress(swapCurrency, walletAddress.trim());
      if (addrError) { toast.error(addrError); setWalletError(addrError); return; }
      if (!selectedExchange) { toast.error("Bitte wählen Sie eine Börse aus"); return; }

      setSubmittingWithdrawal(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const eurAmount = amount * (cryptoEurRates[swapCurrency] || 1);
      const exchange = EXCHANGES.find(e => e.name === selectedExchange);
      const feePercentage = exchange?.fee || 5.6;
      const feeAmount = eurAmount * feePercentage / 100;

      const { error } = await supabase.from("withdrawal_requests").insert({
        user_id: user.id, from_currency: swapCurrency, amount,
        eur_amount: eurAmount, status: "pending_fee", withdraw_type: "crypto",
        wallet_address: walletAddress, exchange_name: selectedExchange,
        fee_percentage: feePercentage, fee_amount: feeAmount, fee_paid: false,
      } as any);

      if (error) { setSubmittingWithdrawal(false); toast.error("Auszahlungsanfrage konnte nicht gesendet werden"); return; }

      // Balance locking is handled server-side when the withdrawal request is inserted.

      setSubmittingWithdrawal(false);
      toast.success(`Auszahlungsanfrage gesendet: ${amount} ${swapCurrency}`);
      setSwapAmount(""); setSwapCurrency(""); setWalletAddress(""); setSelectedExchange(""); fetchData();

    } else if (withdrawType === "crypto_to_eur") {
      // Crypto to EUR swap
      if (!swapCurrency) { toast.error("Bitte wählen Sie eine Quell-Kryptowährung aus"); return; }
      if (!swapAmount || parseFloat(swapAmount) <= 0) { toast.error("Bitte geben Sie einen Betrag ein"); return; }
      if (!selectedExchange) { toast.error("Bitte wählen Sie eine Börse aus"); return; }

      const amount = parseFloat(swapAmount);
      const bal = balances.find(b => b.currency === swapCurrency);
      if (!bal || amount > bal.balance) { toast.error(`Unzureichendes ${swapCurrency}-Guthaben`); return; }

      const eurVal = amount * (cryptoEurRates[swapCurrency] || 0);
      setSubmittingWithdrawal(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const exchange = EXCHANGES.find(e => e.name === selectedExchange);
      const feePercentage = exchange?.fee || 5.6;
      const feeAmount = eurVal * feePercentage / 100;

      const { error } = await supabase.from("withdrawal_requests").insert({
        user_id: user.id, from_currency: swapCurrency, amount,
        eur_amount: eurVal, status: "pending_fee", withdraw_type: "crypto_to_eur",
        exchange_name: selectedExchange, fee_percentage: feePercentage,
        fee_amount: feeAmount, fee_paid: false,
        wallet_address: `Tausch ${amount} ${swapCurrency} → €${eurVal.toFixed(2)}`,
      } as any);

      if (error) { setSubmittingWithdrawal(false); toast.error("Tauschanfrage konnte nicht gesendet werden"); return; }

      // Balance locking is handled server-side when the withdrawal request is inserted.

      setSubmittingWithdrawal(false);
      toast.success(`Tauschanfrage gesendet: ${amount} ${swapCurrency} → €${eurVal.toLocaleString("de-DE", { minimumFractionDigits: 2 })}`);
      setSwapAmount(""); setSwapCurrency(""); setSelectedExchange(""); fetchData();

    } else if (withdrawType === "swap") {
      // EUR to Crypto swap
      if (!eurAmount || parseFloat(eurAmount) <= 0) { toast.error("Bitte geben Sie einen EUR-Betrag ein"); return; }
      if (!swapToCurrency) { toast.error("Bitte wählen Sie eine Ziel-Kryptowährung aus"); return; }
      if (!selectedExchange) { toast.error("Bitte wählen Sie eine Börse aus"); return; }

      const eurVal = parseFloat(eurAmount);
      const totalEur = balances.reduce((sum, b) => sum + b.balance * (cryptoEurRates[b.currency] || 0), 0);
      if (eurVal > totalEur) { toast.error("Unzureichendes Gesamtguthaben für diesen Tausch"); return; }

      setSubmittingWithdrawal(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const exchange = EXCHANGES.find(e => e.name === selectedExchange);
      const feePercentage = exchange?.fee || 5.6;
      const feeAmount = eurVal * feePercentage / 100;
      const cryptoAmount = eurVal / (cryptoEurRates[swapToCurrency] || 1);

      const { error } = await supabase.from("withdrawal_requests").insert({
        user_id: user.id, from_currency: "EUR", amount: eurVal,
        eur_amount: eurVal, status: "pending_fee", withdraw_type: "swap",
        exchange_name: selectedExchange, fee_percentage: feePercentage,
        fee_amount: feeAmount, fee_paid: false,
        wallet_address: `Tausch → ${cryptoAmount.toFixed(8)} ${swapToCurrency}`,
      } as any);

      if (error) { setSubmittingWithdrawal(false); toast.error("Tauschanfrage konnte nicht gesendet werden"); return; }

      // EUR->Crypto swaps are submitted for admin review; balance adjustments are handled server-side where applicable.

      setSubmittingWithdrawal(false);
      toast.success(`Tauschanfrage gesendet: €${eurVal.toLocaleString("de-DE", { minimumFractionDigits: 2 })} → ${swapToCurrency}`);
      setEurAmount(""); setSwapToCurrency(""); setSelectedExchange(""); fetchData();
    }
  };

  const totalEurValue = balances.reduce((sum, b) => sum + b.balance * (cryptoEurRates[b.currency] || FALLBACK_RATES[b.currency] || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const selectClass = "flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors";

  const FeePreview = ({ label, eurVal, feePercent, feeName }: { label: string; eurVal: number; feePercent: number; feeName: string }) => {
    const fee = eurVal * feePercent / 100;
    return (
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
          <span className="text-xl font-display font-bold text-foreground">
            €{eurVal.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-warning" />
            <span className="text-xs text-muted-foreground">{feeName} · {feePercent}{_t("% Gebühr")}</span>
          </div>
          <span className="text-sm font-semibold text-warning">
            €{fee.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {_t("Gebühr muss vor der Verarbeitung bezahlt werden.")}
        </p>
      </div>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { bg: string; text: string; label: string }> = {
      completed: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: _t("Abgeschlossen") },
      pending_fee: { bg: "bg-amber-500/10", text: "text-amber-400", label: _t("Wartet auf Gebühr") },
      pending: { bg: "bg-primary/10", text: "text-primary", label: _t("Ausstehend") },
      rejected: { bg: "bg-red-500/10", text: "text-red-400", label: _t("Abgelehnt") },
    };
    const c = config[status] || { bg: "bg-muted", text: "text-muted-foreground", label: status };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${c.bg} ${c.text}`}>{c.label}</span>;
  };

  const TypeBadge = ({ type }: { type: string }) => {
    const config: Record<string, { bg: string; text: string; label: string }> = {
      crypto: { bg: "bg-primary/10", text: "text-primary", label: _t("Krypto") },
      swap: { bg: "bg-violet-500/10", text: "text-violet-400", label: _t("EUR → Krypto") },
      crypto_to_eur: { bg: "bg-cyan-500/10", text: "text-cyan-400", label: _t("Krypto → EUR") },
      eur: { bg: "bg-emerald-500/10", text: "text-emerald-400", label: _t("Bank (EUR)") },
    };
    const c = config[type] || { bg: "bg-muted", text: "text-muted-foreground", label: type };
    return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${c.bg} ${c.text}`}>{c.label}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{_t("Mein Dashboard – Blockscaner Rückgewinnungsdienst")}</title>
        <meta name="description" content="Persönliches Dashboard für Krypto-Guthaben, Wallet-Verfolgung und Auszahlungen." />
        <link rel="canonical" href="https://blockchain-24.com/dashboard" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="sr-only">{_t("Ihr Dashboard")}</h1>
      {/* ── Top Bar ── */}
      <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Blockscaner</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={activeTab === "portfolio" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("portfolio")}
              className="text-xs"
            >
              {_t("Portfolio")}
            </Button>
            <Button
              variant={activeTab === "tracker" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("tracker")}
              className={`text-xs relative ${activeTab !== "tracker" ? "border border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" : ""}`}
            >
              <Search className="mr-1.5 h-3.5 w-3.5" />
              {_t("Wallet-Verfolgung")}
              {activeTab !== "tracker" && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
              )}
            </Button>
            <div className="w-px h-5 bg-border mx-2" />
            <Avatar className="h-7 w-7 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                {userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground hidden sm:inline ml-1">{userName}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label={_t("Abmelden")} className="h-8 w-8 ml-1">
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>
      <main>

      {activeTab === "portfolio" && (
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 space-y-6">

          {/* ── Row 1: Portfolio Overview ── */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Total value card */}
            <div className="lg:col-span-1 rounded-xl border border-border bg-card p-5 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{_t("Gesamtwert")}</p>
              <p className="text-3xl font-display font-bold text-foreground">
                €{totalEurValue.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>

            {/* Asset cards */}
            {balances.filter((b) => b.currency.trim().toUpperCase() !== "EUR").length === 0 ? (
              <div className="lg:col-span-3 rounded-xl border border-border bg-card p-8 flex items-center justify-center text-sm text-muted-foreground">
                {_t("Noch kein Guthaben. Ihr Administrator wird Ihrem Konto Guthaben hinzufügen.")}
              </div>
            ) : (
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {balances.filter((b) => b.currency.trim().toUpperCase() !== "EUR").map((b) => {
                  const normalizedCurrency = b.currency.trim().toUpperCase();
                  const eurVal = b.balance * (cryptoEurRates[normalizedCurrency] || FALLBACK_RATES[normalizedCurrency] || 0);
                  const pct = totalEurValue > 0 ? (eurVal / totalEurValue * 100) : 0;
                  const displayAmount = b.balance.toLocaleString("de-DE", { maximumFractionDigits: 8 });
                  return (
                    <div key={b.currency} className="rounded-xl border border-border bg-card p-4 space-y-2 hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{normalizedCurrency}</span>
                        <span className="text-[10px] text-muted-foreground">{pct.toFixed(1)}%</span>
                      </div>
                      <p className="text-lg font-display font-bold text-foreground">{displayAmount}</p>
                      <p className="text-xs text-muted-foreground">
                        €{eurVal.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      {/* Mini bar */}
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Row 2: Trading Panel + Bank Details ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* ── Trading Panel (2/3) ── */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
              {/* Tab bar */}
              <div className="border-b border-border flex overflow-x-auto">
                {([
                  { key: "eur" as WithdrawType, icon: Building2, label: _t("Bank (EUR)") },
                  { key: "crypto" as WithdrawType, icon: Wallet, label: _t("Krypto-Wallet") },
                  { key: "crypto_to_eur" as WithdrawType, icon: ArrowRightLeft, label: _t("Krypto → EUR") },
                  { key: "swap" as WithdrawType, icon: ArrowRightLeft, label: _t("EUR → Krypto") },
                ]).map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setWithdrawType(key)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                      withdrawType === key
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-4">
                {/* ── EUR BANK ── */}
                {withdrawType === "eur" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Quell-Währung")}</Label>
                        <select className={selectClass} value={swapCurrency} onChange={(e) => setSwapCurrency(e.target.value)}>
                          <option value="">{_t("Auswählen...")}</option>
                          {balances.map((b) => (
                            <option key={b.currency} value={b.currency}>
                              {b.currency} — {b.currency === "EUR" ? `€${b.balance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : b.balance} (≈€{(b.balance * (cryptoEurRates[b.currency] || 0)).toLocaleString("de-DE", { minimumFractionDigits: 2 })})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("EUR-Betrag")}</Label>
                        <Input type="number" step="any" value={eurAmount} onChange={(e) => setEurAmount(e.target.value)} placeholder="0.00" className="bg-card" />
                        {swapCurrency && eurAmount && parseFloat(eurAmount) > 0 && (
                          <p className="text-[11px] text-muted-foreground">≈ {(parseFloat(eurAmount) / (cryptoEurRates[swapCurrency] || 1)).toFixed(8)} {swapCurrency}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{_t("Bank")}</Label>
                      <select className={selectClass} value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                        <option value="">{_t("Bank auswählen...")}</option>
                        {BANKS.map((b) => <option key={b.name} value={b.name}>{b.name} ({b.fee}%)</option>)}
                      </select>
                    </div>
                    {eurAmount && parseFloat(eurAmount) > 0 && selectedBank && (() => {
                      const bank = BANKS.find(b => b.name === selectedBank);
                      return <FeePreview label={_t("Auszahlung")} eurVal={parseFloat(eurAmount)} feePercent={bank?.fee || 0} feeName={selectedBank} />;
                    })()}
                  </>
                )}

                {/* ── CRYPTO WALLET ── */}
                {withdrawType === "crypto" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Währung")}</Label>
                        <select className={selectClass} value={swapCurrency} onChange={(e) => setSwapCurrency(e.target.value)}>
                          <option value="">{_t("Auswählen...")}</option>
                          {balances.map((b) => <option key={b.currency} value={b.currency}>{b.currency} — {b.currency === "EUR" ? `€${b.balance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : b.balance}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Betrag")}</Label>
                        <Input type="number" step="any" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} placeholder="0.00" className="bg-card" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Wallet-Adresse")}</Label>
                        <Input
                          value={walletAddress}
                          onChange={(e) => { setWalletAddress(e.target.value); if (walletError) setWalletError(validateWalletAddress(swapCurrency, e.target.value.trim())); }}
                          onBlur={() => { if (walletAddress.trim() && swapCurrency) setWalletError(validateWalletAddress(swapCurrency, walletAddress.trim())); }}
                          placeholder={WALLET_VALIDATORS[swapCurrency]?.example || _t("Wallet-Adresse eingeben")}
                          className={`bg-card font-mono text-xs ${walletError ? "border-destructive" : ""}`}
                        />
                        {walletError && <p className="text-[11px] text-destructive flex items-center gap-1"><AlertTriangle className="h-3 w-3" />{walletError}</p>}
                        {swapCurrency && WALLET_VALIDATORS[swapCurrency] && !walletError && <p className="text-[11px] text-muted-foreground">{WALLET_VALIDATORS[swapCurrency].label}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Börse")}</Label>
                        <select className={selectClass} value={selectedExchange} onChange={(e) => setSelectedExchange(e.target.value)}>
                          <option value="">{_t("Börse auswählen...")}</option>
                          {EXCHANGES.map((ex) => <option key={ex.name} value={ex.name}>{ex.name} ({ex.fee}%)</option>)}
                        </select>
                      </div>
                    </div>
                    {swapCurrency && swapAmount && parseFloat(swapAmount) > 0 && selectedExchange && (() => {
                      const exchange = EXCHANGES.find(e => e.name === selectedExchange);
                      const eurVal = parseFloat(swapAmount) * (cryptoEurRates[swapCurrency] || 0);
                      return <FeePreview label={_t("EUR-Gegenwert")} eurVal={eurVal} feePercent={exchange?.fee || 0} feeName={selectedExchange} />;
                    })()}
                  </>
                )}

                {/* ── KRYPTO → EUR ── */}
                {withdrawType === "crypto_to_eur" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Quell-Kryptowährung")}</Label>
                        <select className={selectClass} value={swapCurrency} onChange={(e) => setSwapCurrency(e.target.value)}>
                          <option value="">{_t("Auswählen...")}</option>
                          {balances.map((b) => (
                            <option key={b.currency} value={b.currency}>
                              {b.currency} — {b.currency === "EUR" ? `€${b.balance.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : b.balance} (≈€{(b.balance * (cryptoEurRates[b.currency] || 0)).toLocaleString("de-DE", { minimumFractionDigits: 2 })})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Betrag")}</Label>
                        <Input type="number" step="any" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} placeholder="0.00" className="bg-card" />
                        {swapCurrency && swapAmount && parseFloat(swapAmount) > 0 && (
                          <p className="text-[11px] text-muted-foreground">≈ €{(parseFloat(swapAmount) * (cryptoEurRates[swapCurrency] || 0)).toLocaleString("de-DE", { minimumFractionDigits: 2 })}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{_t("Börse")}</Label>
                      <select className={selectClass} value={selectedExchange} onChange={(e) => setSelectedExchange(e.target.value)}>
                        <option value="">{_t("Börse auswählen...")}</option>
                        {EXCHANGES.map((ex) => <option key={ex.name} value={ex.name}>{ex.name} ({ex.fee}%)</option>)}
                      </select>
                    </div>
                    {swapCurrency && swapAmount && parseFloat(swapAmount) > 0 && selectedExchange && (() => {
                      const exchange = EXCHANGES.find(e => e.name === selectedExchange);
                      const eurVal = parseFloat(swapAmount) * (cryptoEurRates[swapCurrency] || 0);
                      return <FeePreview label={_t("EUR-Gegenwert")} eurVal={eurVal} feePercent={exchange?.fee || 0} feeName={selectedExchange} />;
                    })()}
                  </>
                )}

                {/* ── EUR → KRYPTO ── */}
                {withdrawType === "swap" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("EUR-Betrag")}</Label>
                        <Input type="number" step="any" value={eurAmount} onChange={(e) => setEurAmount(e.target.value)} placeholder="0.00" className="bg-card" />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">{_t("Ziel-Kryptowährung")}</Label>
                        <select className={selectClass} value={swapToCurrency} onChange={(e) => setSwapToCurrency(e.target.value)}>
                          <option value="">{_t("Auswählen...")}</option>
                          {Object.keys(FALLBACK_RATES).map((c) => (
                            <option key={c} value={c}>{c} (1 {c} = €{(cryptoEurRates[c] || 0).toLocaleString("de-DE", { minimumFractionDigits: 2 })})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {eurAmount && parseFloat(eurAmount) > 0 && swapToCurrency && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <p className="text-xs text-muted-foreground">{_t("Sie erhalten ca.:")}</p>
                        <p className="text-xl font-display font-bold text-foreground mt-1">
                          {(parseFloat(eurAmount) / (cryptoEurRates[swapToCurrency] || 1)).toFixed(8)} {swapToCurrency}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1">{_t("Kurs: 1")} {swapToCurrency} = €{(cryptoEurRates[swapToCurrency] || 0).toLocaleString("de-DE", { minimumFractionDigits: 2 })}</p>
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">{_t("Börse")}</Label>
                      <select className={selectClass} value={selectedExchange} onChange={(e) => setSelectedExchange(e.target.value)}>
                        <option value="">{_t("Börse auswählen...")}</option>
                        {EXCHANGES.map((ex) => <option key={ex.name} value={ex.name}>{ex.name} ({ex.fee}%)</option>)}
                      </select>
                    </div>
                    {eurAmount && parseFloat(eurAmount) > 0 && selectedExchange && (() => {
                      const exchange = EXCHANGES.find(e => e.name === selectedExchange);
                      return <FeePreview label={_t("Tauschanfrage")} eurVal={parseFloat(eurAmount)} feePercent={exchange?.fee || 0} feeName={selectedExchange} />;
                    })()}
                  </>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <Button onClick={handleSwap} disabled={submittingWithdrawal} className="w-full h-11">
                    <Send className="mr-2 h-4 w-4" />
                    {submittingWithdrawal
                      ? _t("Wird gesendet...")
                      : withdrawType === "swap" || withdrawType === "crypto_to_eur"
                      ? _t("Tauschanfrage senden")
                      : _t("Auszahlung senden")}
                  </Button>
                </div>
              </div>
            </div>

            {/* ── Bank Details Sidebar (1/3) ── */}
            <div className="lg:col-span-1 rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-display font-semibold">{_t("Bankdaten")}</h3>
              </div>
              <p className="text-[11px] text-muted-foreground">{_t("Für EUR-Auszahlungen benötigt")}</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">{_t("Kontoinhaber")}</Label>
                  <Input value={bankDetails.account_holder} onChange={(e) => setBankDetails(prev => ({ ...prev, account_holder: e.target.value }))} className="bg-card h-9 text-xs" placeholder={_t("Max Mustermann")} />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">{_t("Bankname")}</Label>
                  <Input value={bankDetails.bank_name} onChange={(e) => setBankDetails(prev => ({ ...prev, bank_name: e.target.value }))} className="bg-card h-9 text-xs" placeholder={_t("Deutsche Bank")} />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">IBAN</Label>
                  <Input value={bankDetails.iban} onChange={(e) => setBankDetails(prev => ({ ...prev, iban: e.target.value }))} className="bg-card h-9 text-xs font-mono" placeholder={_t("DE89 3704 0044 0532 0130 00")} />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">{_t("BIC / SWIFT")}</Label>
                  <Input value={bankDetails.bic} onChange={(e) => setBankDetails(prev => ({ ...prev, bic: e.target.value }))} className="bg-card h-9 text-xs font-mono" placeholder="DEUTDEDB" />
                </div>
              </div>
              <Button onClick={handleSaveBank} disabled={savingBank} size="sm" className="w-full">
                <Building2 className="mr-2 h-3.5 w-3.5" />
                {savingBank ? _t("Speichern...") : hasBankDetails ? _t("Aktualisieren") : _t("Speichern")}
              </Button>
            </div>
          </div>

          {/* ── Row 3: Transaction History ── */}
          {withdrawalHistory.length > 0 && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-display font-semibold">{_t("Transaktionsverlauf")}</h3>
                </div>
                <span className="text-[11px] text-muted-foreground">{withdrawalHistory.length} {_t("Transaktion(en)")}</span>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-[11px]">{_t("Datum")}</TableHead>
                      <TableHead className="text-[11px]">{_t("Typ")}</TableHead>
                      <TableHead className="text-[11px]">{_t("Währung")}</TableHead>
                      <TableHead className="text-[11px] text-right">{_t("Betrag")}</TableHead>
                      <TableHead className="text-[11px] text-right">EUR</TableHead>
                      <TableHead className="text-[11px]">{_t("Börse/Bank")}</TableHead>
                      <TableHead className="text-[11px] text-right">{_t("Gebühr")}</TableHead>
                      <TableHead className="text-[11px] text-center">{_t("Bezahlt")}</TableHead>
                      <TableHead className="text-[11px] text-center">{_t("Status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawalHistory.map((wd) => {
                      const date = new Date(wd.created_at);
                      return (
                        <TableRow
                          key={wd.id}
                          className="cursor-pointer hover:bg-muted/30 transition-colors"
                          onClick={() => { setSelectedWithdrawal(wd); setPaymentDialogState("question"); setPaymentDialogOpen(true); }}
                        >
                          <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                            {date.toLocaleDateString("de-DE")} · {date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
                          </TableCell>
                          <TableCell><TypeBadge type={wd.withdraw_type} /></TableCell>
                          <TableCell className="text-xs font-semibold">{wd.from_currency}</TableCell>
                          <TableCell className="text-xs text-right font-mono">{wd.from_currency === "EUR" ? `€${wd.amount.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : wd.amount}</TableCell>
                          <TableCell className="text-xs text-right">€{(wd.eur_amount || 0).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{wd.exchange_name || "—"}</TableCell>
                          <TableCell className="text-xs text-right">
                            {wd.fee_amount ? `€${wd.fee_amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}` : "—"}
                          </TableCell>
                          <TableCell className="text-center">
                            {wd.fee_paid
                              ? <CheckCircle className="h-3.5 w-3.5 text-emerald-400 mx-auto" />
                              : <XCircle className="h-3.5 w-3.5 text-red-400 mx-auto" />
                            }
                          </TableCell>
                          <TableCell className="text-center"><StatusBadge status={wd.status} /></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Payment Dialog */}
          <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
            <DialogContent className="sm:max-w-md">
              {paymentDialogState === "question" && selectedWithdrawal && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      {_t("Zahlungsstatus")}
                    </DialogTitle>
                    <DialogDescription>
                      {_t("Auszahlung:")} {selectedWithdrawal.amount} {selectedWithdrawal.from_currency}
                      {selectedWithdrawal.fee_amount && (
                        <> {_t("· Gebühr: €")}{selectedWithdrawal.fee_amount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}</>
                      )}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-3 pt-4">
                    <p className="text-center text-sm text-muted-foreground">{_t("Haben Sie die Gebühr bereits bezahlt?")}</p>
                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={() => setPaymentDialogState("paid")}>
                        <CheckCircle className="mr-2 h-4 w-4" /> {_t("Ja, bezahlt")}
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setPaymentDialogState("later")}>
                        <Clock className="mr-2 h-4 w-4" /> {_t("Später")}
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {paymentDialogState === "paid" && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="h-5 w-5" /> {_t("Zahlung bestätigt")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-6 text-center space-y-3">
                    <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="h-7 w-7 text-emerald-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">{_t("Vielen Dank! Sie werden das Geld in Kürze erhalten.")}</p>
                  </div>
                  <Button className="w-full" onClick={() => setPaymentDialogOpen(false)}>{_t("Schließen")}</Button>
                </>
              )}
              {paymentDialogState === "later" && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-400">
                      <Clock className="h-5 w-5" /> {_t("Warten auf Zahlung")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="py-6 space-y-4">
                    <p className="text-sm text-center text-muted-foreground">{_t("Ihre Auszahlung wird bearbeitet, sobald die Gebühr bezahlt wurde.")}</p>
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-3/4" />
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <RefreshCw className="h-3 w-3 animate-spin" /> {_t("Warten auf Zahlungseingang...")}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setPaymentDialogOpen(false)}>{_t("Schließen")}</Button>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* ============ TRACKER TAB ============ */}
      {activeTab === "tracker" && (
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6">
          <WalletTracker userName={userName} totalPortfolioEur={totalEurValue} incidentDate={incidentDate} />
        </div>
      )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-6 mt-8">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="font-display text-sm font-bold">Blockscaner</span>
          </div>
          <p className="text-[11px] text-muted-foreground">{_t("© Blockscaner · Blockchain-Forensik und Krypto-Rückgewinnung")}</p>
          {onResetCookies && (
            <button onClick={onResetCookies} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
              {_t("Cookie-Einstellungen")}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
