import { t as _t } from "@/i18n";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownLeft, ArrowUpRight, ExternalLink, Loader2, RefreshCcw, Repeat, Globe } from "lucide-react";
import { fetchOnChainHistory, type AddressSummary, type OnChainTx } from "@/lib/blockchainApi";

interface Props {
  address: string;
}

const shorten = (s: string) => (s && s.length > 14 ? `${s.slice(0, 8)}…${s.slice(-6)}` : s || "—");

const OnChainHistory = ({ address }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<AddressSummary | null>(null);
  const [txs, setTxs] = useState<OnChainTx[]>([]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { summary, txs } = await fetchOnChainHistory(address);
      setSummary(summary);
      setTxs(txs);
    } catch (e: any) {
      setError(e?.message ?? _t("Fehler beim Laden der On-Chain-Daten"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Card className="glow-border">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              {_t("Echte On-Chain Historie")}
            </CardTitle>
            <CardDescription>
              {_t("Live-Daten direkt von der Blockchain (")}{summary?.chain === "bitcoin" ? _t("Bitcoin / Blockstream") : _t("Ethereum / Blockscout")}).
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading} className="shrink-0">
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="py-10 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            {_t("Blockchain wird abgefragt…")}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && summary && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-secondary/40 p-3">
                <p className="text-xs text-muted-foreground">{_t("Kette")}</p>
                <p className="font-display font-bold capitalize">{summary.chain}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/40 p-3">
                <p className="text-xs text-muted-foreground">{_t("Aktueller Saldo")}</p>
                <p className="font-display font-bold">{summary.balanceFormatted}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/40 p-3">
                <p className="text-xs text-muted-foreground">{_t("Transaktionen gesamt")}</p>
                <p className="font-display font-bold">{summary.txCount.toLocaleString("de-DE")}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href={summary.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                {_t("Im Block-Explorer öffnen")} <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {txs.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">
                {_t("Keine Transaktionen für diese Adresse gefunden.")}
              </p>
            ) : (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {txs.map((t) => {
                  const Icon =
                    t.direction === "in" ? ArrowDownLeft : t.direction === "out" ? ArrowUpRight : Repeat;
                  const color =
                    t.direction === "in"
                      ? "text-[hsl(var(--success))]"
                      : t.direction === "out"
                      ? "text-destructive"
                      : "text-muted-foreground";
                  return (
                    <a
                      key={t.hash}
                      href={t.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-border bg-secondary/40 p-3 hover:bg-secondary/70 transition"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon className={`h-4 w-4 shrink-0 ${color}`} />
                          <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">
                              {t.timestamp ? t.timestamp.toLocaleString("de-DE") : _t("Unbestätigt")}
                            </p>
                            <p className="font-mono text-xs truncate">
                              {t.direction === "in" ? _t("Von ") : _t("An ")}
                              {shorten(t.direction === "in" ? t.from : t.to)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {t.status !== "success" && (
                            <Badge variant={t.status === "failed" ? "destructive" : "secondary"} className="text-[10px]">
                              {t.status === "failed" ? _t("Fehlgeschlagen") : _t("Ausstehend")}
                            </Badge>
                          )}
                          <span className={`font-mono text-sm font-semibold ${color}`}>
                            {t.direction === "out" ? "-" : t.direction === "in" ? "+" : ""}
                            {t.valueFormatted}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OnChainHistory;
