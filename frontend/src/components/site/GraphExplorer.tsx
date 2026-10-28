import { t as _t } from "@/i18n";
import { useMemo, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { detectChain, fetchOnChainHistory, type AddressSummary, type OnChainTx } from "@/lib/blockchainApi";

const short = (s: string) => (s && s.length > 14 ? `${s.slice(0, 6)}…${s.slice(-4)}` : s || "—");
const fmtUtc = (d: Date) => d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
const fmtBerlin = (d: Date) => d.toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "short", timeStyle: "short" });

type Range = "all" | "30" | "365";

/** Real public-ledger explorer: radial counterparty graph + timeline. Data via Blockscout (ETH) / Blockstream (BTC). */
const GraphExplorer = () => {
  const [addr, setAddr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ summary: AddressSummary; txs: OnChainTx[]; at: Date } | null>(null);
  const [range, setRange] = useState<Range>("all");
  const [sel, setSel] = useState<string | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    const a = addr.trim();
    if (detectChain(a) === "unknown") { setError(_t("Ungültige Adresse. Unterstützt: Ethereum (0x + 40 Hex-Zeichen) und Bitcoin (1…, 3…, bc1…).")); return; }
    setLoading(true); setError(null); setSel(null);
    try { const r = await fetchOnChainHistory(a); setData({ ...r, at: new Date() }); }
    catch (err: any) { setError(err?.message ?? _t("Datenquelle nicht erreichbar. Bitte später erneut versuchen.")); setData(null); }
    finally { setLoading(false); }
  };

  const txs = useMemo(() => {
    if (!data) return [];
    if (range === "all") return data.txs;
    const cut = Date.now() - Number(range) * 864e5;
    return data.txs.filter((t) => t.timestamp && t.timestamp.getTime() >= cut);
  }, [data, range]);

  const peers = useMemo(() => {
    const m = new Map<string, { addr: string; inV: number; outV: number; n: number }>();
    txs.forEach((t) => {
      const p = t.direction === "in" ? t.from : t.to;
      if (!p || p === "—") return;
      const e = m.get(p) ?? { addr: p, inV: 0, outV: 0, n: 0 };
      if (t.direction === "in") e.inV += t.valueRaw; else e.outV += t.valueRaw;
      e.n++; m.set(p, e);
    });
    return [...m.values()].sort((a, b) => b.inV + b.outV - (a.inV + a.outV)).slice(0, 18);
  }, [txs]);

  const maxV = Math.max(1e-12, ...peers.map((p) => p.inV + p.outV));
  const symbol = data?.summary.chain === "bitcoin" ? "BTC" : "ETH";
  const selPeer = peers.find((p) => p.addr === sel);

  return (
    <div className="border border-border bg-card">
      <form onSubmit={run} className="flex flex-col md:flex-row border-b border-border bg-primary/5 p-3 gap-3">
        <label htmlFor="addr" className="sr-only">{_t("Wallet-Adresse")}</label>
        <input id="addr" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder={_t("Öffentliche Adresse eingeben – z. B. 0x… oder bc1…")}
          className="flex-1 bg-background border-2 border-primary/30 focus:border-primary px-5 h-16 font-mono text-base outline-none" spellCheck={false} autoComplete="off" />
        <button disabled={loading} className="h-16 px-10 bg-primary text-primary-foreground text-base font-semibold disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} {_t("Adresse analysieren")}
        </button>
      </form>
      <p className="px-5 py-3 text-xs text-muted-foreground border-b border-border">
        {_t("Es werden ausschließlich öffentliche Ledger-Daten abgefragt. Geben Sie niemals eine Seed-Phrase oder einen privaten Schlüssel ein.")}
      </p>

      {error && <div role="alert" className="m-5 border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm">{error}</div>}

      {!data && !error && !loading && (
        <div className="px-5 py-16 text-center text-sm text-muted-foreground">{_t("Noch keine Abfrage. Ergebnisse erscheinen hier als Graph und Zeitachse.")}</div>
      )}

      {data && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-5 border-b border-border">
            {[
              [_t("Netzwerk"), data.summary.chain === "bitcoin" ? _t("Bitcoin Mainnet") : _t("Ethereum Mainnet")],
              [_t("Saldo"), data.summary.balanceFormatted],
              [_t("Transaktionen gesamt"), data.summary.txCount.toLocaleString("de-DE")],
              [_t("Quelle"), data.summary.chain === "bitcoin" ? _t("Blockstream Esplora") : _t("Blockscout API v2")],
              [_t("Abgerufen"), fmtUtc(data.at)],
            ].map(([k, v]) => (
              <div key={k} className="px-5 py-4 border-r border-border last:border-r-0">
                <p className="eyebrow">{k}</p><p className="mt-1 font-mono text-sm break-all">{v}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-border text-xs">
            <span className="eyebrow mr-2">{_t("Zeitraum")}</span>
            {(["all", "365", "30"] as Range[]).map((r) => (
              <button key={r} onClick={() => setRange(r)} className={`px-3 py-1 border ${range === r ? "border-primary text-foreground" : "border-border text-muted-foreground"}`}>
                {r === "all" ? _t("Alle geladenen") : `Letzte ${r} Tage`}
              </button>
            ))}
            <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-1 bg-success/15 text-success font-mono">{_t("● Beobachtete Daten")}</span>
          </div>

          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3 border-r border-border p-4">
              <svg viewBox="0 0 600 460" className="w-full h-auto" role="img" aria-label={`Graph mit ${peers.length} Gegenparteien der Adresse ${short(data.summary.address)}`}>
                {peers.map((p, i) => {
                  const a = (i / Math.max(peers.length, 1)) * Math.PI * 2 - Math.PI / 2;
                  const r = 170;
                  const x = 300 + Math.cos(a) * r, y = 230 + Math.sin(a) * r;
                  const w = 0.6 + ((p.inV + p.outV) / maxV) * 5;
                  const inbound = p.inV >= p.outV;
                  return (
                    <g key={p.addr} className="cursor-pointer" onClick={() => setSel(p.addr)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setSel(p.addr)} role="button" aria-label={`Gegenpartei ${p.addr}`}>
                      <line x1={300} y1={230} x2={x} y2={y} stroke={`hsl(var(${inbound ? "--success" : "--signal"}))`} strokeOpacity={sel && sel !== p.addr ? 0.15 : 0.6} strokeWidth={w} strokeDasharray={inbound ? "0" : "4 3"} />
                      <circle cx={x} cy={y} r={sel === p.addr ? 9 : 6} fill="hsl(var(--card))" stroke={`hsl(var(${sel === p.addr ? "--primary" : "--silver"}))`} strokeWidth={1.5} />
                      <text x={x} y={y + (y > 230 ? 22 : -14)} textAnchor="middle" className="fill-muted-foreground" style={{ font: "10px 'IBM Plex Mono'" }}>{short(p.addr)}</text>
                    </g>
                  );
                })}
                <circle cx={300} cy={230} r={14} fill="hsl(var(--primary))" />
                <text x={300} y={262} textAnchor="middle" className="fill-foreground" style={{ font: "11px 'IBM Plex Mono'" }}>{short(data.summary.address)}</text>
              </svg>
              <p className="text-xs text-muted-foreground mt-2">{_t("Durchgezogen = überwiegend eingehend · gestrichelt = überwiegend ausgehend · Linienstärke = Volumen. Bis zu 18 Gegenparteien aus den zuletzt geladenen Transaktionen.")}</p>
            </div>
            <div className="lg:col-span-2 p-5">
              {selPeer ? (
                <div>
                  <p className="eyebrow mb-2">{_t("Ausgewählte Gegenpartei")}</p>
                  <p className="font-mono text-xs break-all mb-4">{selPeer.addr}</p>
                  <dl className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div><dt className="eyebrow">{_t("Eingehend")}</dt><dd className="font-mono">{selPeer.inV.toLocaleString("de-DE", { maximumFractionDigits: 6 })} {symbol}</dd></div>
                    <div><dt className="eyebrow">{_t("Ausgehend")}</dt><dd className="font-mono">{selPeer.outV.toLocaleString("de-DE", { maximumFractionDigits: 6 })} {symbol}</dd></div>
                    <div><dt className="eyebrow">{_t("Transaktionen")}</dt><dd className="font-mono">{selPeer.n}</dd></div>
                  </dl>
                  <a className="text-xs text-primary inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer"
                    href={data.summary.chain === "bitcoin" ? `https://blockstream.info/address/${selPeer.addr}` : `https://eth.blockscout.com/address/${selPeer.addr}`}>
                    {_t("Im öffentlichen Explorer prüfen")} <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="mt-6 text-xs text-muted-foreground border-l-2 border-warning pl-3">{_t("Interpretation: Eine Verbindung belegt nur eine Transaktion. Sie sagt nichts über Identität oder Absicht der Beteiligten aus.")}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{_t("Wählen Sie einen Knoten im Graphen, um Details zu sehen.")}</p>
              )}
            </div>
          </div>

          <div className="border-t border-border">
            <p className="eyebrow px-5 pt-5">{_t("Zeitachse (")}{txs.length})</p>
            <div className="max-h-[860px] overflow-y-auto mt-3">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-card text-muted-foreground"><tr className="text-left">
                  <th className="px-5 py-2 font-normal">UTC</th><th className="px-2 py-2 font-normal hidden md:table-cell">Europe/Berlin</th><th className="px-2 py-2 font-normal">{_t("Richtung")}</th><th className="px-2 py-2 font-normal">{_t("Gegenpartei")}</th><th className="px-5 py-2 font-normal text-right">{_t("Betrag")}</th>
                </tr></thead>
                <tbody>
                  {txs.map((t) => (
                    <tr key={t.hash} className="border-t border-border hover:bg-secondary/50">
                      <td className="px-5 py-2 font-mono">{t.timestamp ? fmtUtc(t.timestamp) : _t("unbestätigt")}</td>
                      <td className="px-2 py-2 font-mono hidden md:table-cell">{t.timestamp ? fmtBerlin(t.timestamp) : "—"}</td>
                      <td className="px-2 py-2">{t.direction === "in" ? _t("Eingang") : t.direction === "out" ? _t("Ausgang") : _t("Intern")}{t.status !== "success" && ` · ${t.status === "failed" ? "fehlgeschlagen" : "ausstehend"}`}</td>
                      <td className="px-2 py-2 font-mono">{short(t.direction === "in" ? t.from : t.to)}</td>
                      <td className="px-5 py-2 font-mono text-right"><a href={t.explorerUrl} target="_blank" rel="noopener noreferrer" className="text-primary">{t.direction === "out" ? "−" : "+"}{t.valueFormatted}</a></td>
                    </tr>
                  ))}
                  {txs.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">{_t("Keine Transaktionen im gewählten Zeitraum.")}</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphExplorer;
