import React from "react";
import { t } from "@/i18n";
import { Link } from "react-router-dom";
import { ArrowRight, User, Landmark, Building2, CreditCard, FileText, Mail, Globe, Shield, Scale, Wallet, Briefcase, Smartphone, Fingerprint, Cpu, MapPin, Hash, Users, Package, Server, MousePointer2 } from "lucide-react";

const rows = [
  ["fab-a02b6", "15:00:08", "0.00000000 ETH", "$0.00", "0x420-eb0"],
  ["35c-0581a", "15:00:08", "0.23750000 ETH", "$825.31", "0x5b8-2167"],
  ["65d-23a0b", "15:00:09", "0.00000000 ETH", "$0.00", "0x533-ae6"],
  ["be3-0b0c5", "15:00:08", "0.00000000 ETH", "$0.00", "0xb89-d1fa"],
  null,
  ["35c-17829", "15:00:08", "0.00000000 ETH", "$0.00", "0x780-1023"],
  ["a51-48665", "15:00:08", "0.02880157 ETH", "$100.06", "0xcfd-baef"],
  ["b1f-ccfb0", "15:00:07", "0.00000000 ETH", "$0.00", "0xb2f-70a8"],
  ["062-061a1", "15:00:08", "1.00000000 ETH", "$3,474.97", "0x45c-d66b"],
];

const gems: [any, string, string][] = [
  [Wallet, "bg-gem-yellow", t("Kasse")], [Landmark, "bg-gem-orange", t("Bankkonto")], [Building2, "bg-gem-purple", t("Bank")], [Briefcase, "bg-gem-purple", t("Firma")],
  [Server, "bg-gem-orange", t("Händler")], [CreditCard, "bg-gem-purple", t("Kreditkarte")], [FileText, "bg-gem-purple", t("Dokument")], [Mail, "bg-gem-olive", t("E-Mail")],
  [Smartphone, "bg-gem-purple", t("Multimedia")], [Globe, "bg-gem-purple", t("IP-Adresse")], [Shield, "bg-gem-olive", t("Polizei")], [Scale, "bg-gem-green", t("Verfahren")],
  [Hash, "bg-gem-purple", t("Nachricht")], [Package, "bg-gem-olive", t("Institution")], [Fingerprint, "bg-gem-green", t("Gericht")], [MapPin, "bg-gem-green", t("Eingang")],
  [Cpu, "bg-gem-olive", ""], [Users, "bg-gem-green", ""], [User, "bg-gem-green", ""], [Globe, "bg-gem-teal", ""],
];

const pentagon = { clipPath: "polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)" };

function TableMock() {
  return (
    <div className="grid grid-cols-2 gap-6 items-center rounded-3xl bg-background px-10 py-12 shadow-sm">
      <div>
        <p className="font-display text-sm font-bold leading-tight">{t("Intelligente Automatisierung,")}<br />{t("intuitive Abläufe")}</p>
        <p className="mt-3 text-[9px] leading-snug text-foreground/80">{t("Aufgaben, die früher fortgeschrittene Erfahrung und stundenlange Analyse erforderten, werden jetzt mit einem Klick gelöst. Swaps, Bridges, Mixer und komplexe Vertragsaktivitäten werden automatisch in klare, verständliche Schritte übersetzt – Verschleierung wird entfernt, Spuren werden sofort sichtbar.")}</p>
        <p className="mt-3 text-[9px] leading-snug text-foreground/80">{t("Fortgeschrittene Rückverfolgung und Analyse, vereinfacht, damit jeder Ermittler schneller und mit weniger Ressourcen handeln kann.")}</p>
      </div>
      <div className="font-mono text-[6.5px] text-foreground/70">
        {rows.map((r, i) => r ? (
          <div key={i} className="grid grid-cols-[1.1fr_.8fr_1.6fr_.9fr_1fr] gap-1 py-[5px]">
            <span>{r[0]}</span><span className="text-foreground/30">{r[1]}</span><span>{r[2]}</span><span className="text-right">{r[3]}</span><span>{r[4]}</span>
          </div>
        ) : (
          <div key={i} className="my-1 rounded-md bg-background shadow-md border border-border px-2 py-2 font-sans">
            <div className="flex items-center gap-2 text-[7px] font-bold text-foreground">{t("Interpretation der Transaktion")}<span className="rounded bg-primary/10 px-1 text-[5.5px] font-normal text-primary">{t("Cross-Chain-Brücke")}</span></div>
            <div className="mt-1.5 flex items-center gap-1 text-[6px]">{t("Übertragen")} <span className="h-2 w-2 rounded-full bg-primary" /> 22.7 WETH → <span className="h-2 w-2 rounded-full bg-primary" /> 22.6 ETH {t("über SparkPort")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EntityMock() {
  return (
    <div className="grid grid-cols-2 gap-8 items-center rounded-3xl bg-background px-10 py-12 shadow-sm">
      <div className="relative rounded bg-muted/60 p-3">
        <div className="absolute left-3 top-3 text-center text-[6px]">
          <div className="mx-auto h-8 w-8 bg-gem-purple flex items-center justify-center text-background" style={pentagon}><User className="h-4 w-4" /></div>
          <p className="mt-1">{t("Verdächtiger Betreiber")}</p>
          <div className="absolute left-7 top-6 z-10 w-14 rounded bg-background p-1 text-left text-[5px] shadow-lg border border-border space-y-1">
            <p>{t("Eigenes Objekt hinzufügen")}</p><p>{t("Symbol")}</p><p>{t("Farbe")}</p><p>{t("Umbenennen")}</p>
            <MousePointer2 className="absolute -right-2 top-3 h-3 w-3 fill-foreground" />
          </div>
        </div>
        <div className="ml-14 grid grid-cols-4 gap-x-2 gap-y-2">
          {gems.map(([I, c, l], i) => (
            <div key={i} className="text-center">
              <div className={`mx-auto h-5 w-5 ${c} flex items-center justify-center text-background transition-transform hover:scale-125`} style={pentagon}><I className="h-2.5 w-2.5" /></div>
              <p className="mt-0.5 truncate text-[4.5px] text-foreground/70">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-display text-sm font-bold leading-tight text-[hsl(var(--gem-purple))] brightness-50">{t("Die ganze Geschichte erzählen,")}<br />{t("on-chain und off-chain")}</p>
        <p className="mt-3 text-[8px] leading-snug text-foreground/80">{t("Komplexe Netzwerke müssen nicht kompliziert aussehen. Eigene Designs, visuelle Elemente und Anmerkungen erleichtern die Nachverfolgung jedes Falls. Fügen Sie dem Graphen Kontext hinzu – von Finanzinstituten und Kommunikationskanälen bis zu Belegen –, um On-Chain-Aktivitäten mit Personen und Diensten zu verknüpfen.")}</p>
        <p className="mt-3 text-[8px] leading-snug text-foreground/80">{t("Teilen Sie Erkenntnisse, die jeder verstehen kann – ob zur Information der Leitung, zur Zusammenarbeit zwischen Teams oder zur Vorlage vor Gericht.")}</p>
      </div>
    </div>
  );
}

function Feature({ n, h, p, mock, reverse }: { n: string; h: string; p: string[]; mock: React.ReactNode; reverse?: boolean }) {
  return (
    <div className={`grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center ${reverse ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
      <div className={reverse ? "lg:order-2" : ""}>
        <p className="font-mono text-[10px] font-bold text-emerald mb-4">{n}</p>
        <h3 className="font-display text-3xl font-bold leading-[1.15] max-w-sm">{h}</h3>
        {p.map((x) => <p key={x} className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md">{x}</p>)}
        <Link to="/tools" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold !text-foreground">{t("Unsere Tools entdecken")} <ArrowRight className="h-3 w-3" /></Link>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{mock}</div>
    </div>
  );
}

export default function StoryFeatures() {
  return (
    <section className="bg-mint px-6 lg:px-10 pt-16 pb-24">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-display text-4xl lg:text-5xl font-bold leading-[1.05] text-foreground">
          {t("Verstehen Sie die Blockchain")}<br /><span className="text-emerald">{t("wie nie zuvor")}</span>
        </h2>
        <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto">{t("Verwandeln Sie komplexe Bewegungen in eine klare, nachvollziehbare und handlungsbereite Geschichte.")}</p>
      </div>
      <div className="mx-auto max-w-6xl mt-24 space-y-36">
        <Feature n="01" h={t("Intelligente Automatisierung, intuitive Prozesse")} p={[t("Vorgänge, die früher stundenlange Analysen erforderten, werden in klaren, verständlichen Schritten interpretiert. Swaps, Bridges, Mixer und komplexe Verträge sind keine Hürde mehr für die Ermittlung."), t("Automatischer Kontext reduziert manuelle Arbeit und lässt jeden Analysten schneller zu den relevanten Signalen gelangen.")]} mock={<TableMock />} />
        <Feature reverse n="02" h={t("Die ganze Geschichte erzählen, on-chain und off-chain")} p={[t("Fügen Sie Finanzentitäten, Kommunikationskanäle, Dokumente und rechtliche Elemente derselben Karte hinzu, um Blockchain-Aktivitäten mit Personen, Diensten und überprüfbaren Fakten zu verbinden."), t("Die Ergebnisse werden so aufbereitet, dass Ermittler, Anwälte und Behörden sie klar verstehen und teilen können.")]} mock={<EntityMock />} />
      </div>
    </section>
  );
}
