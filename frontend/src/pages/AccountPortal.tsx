import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownToLine, ArrowLeftRight, Landmark, Lock, Wallet, History,
  ShieldCheck, TrendingUp, LogOut, UserRound, CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useP } from "@/i18n/portal";
import "@/account-portal.css";
import SiteLayout from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WithdrawalWizard } from "@/components/account/WithdrawalWizard";
import { ProfileKyc } from "@/components/account/ProfileKyc";

const ACTIVOS = ["BTC","ETH","USDT","SOL","BNB","TRX","EUR","USD","GBP","CHF","JPY","CNY","AUD","CAD"];
const FIAT = ["EUR","USD","GBP","CHF","JPY","CNY","AUD","CAD"];
const SIMBOLOS: Record<string,string> = { BTC:"₿",ETH:"Ξ",USDT:"₮",SOL:"S",BNB:"B",TRX:"T",EUR:"€",USD:"$",GBP:"£",CHF:"₣",JPY:"¥",CNY:"元",AUD:"A$",CAD:"C$" };
const NOMBRES: Record<string,[string,string]> = {
  BTC:["Bitcoin","Bitcoin"],ETH:["Ethereum","Ethereum"],USDT:["Tether","Tether"],SOL:["Solana","Solana"],BNB:["BNB","BNB"],TRX:["TRON","TRON"],
  EUR:["Euro","Euro"],USD:["US-Dollar","US Dollar"],GBP:["Britisches Pfund","British Pound"],CHF:["Schweizer Franken","Swiss Franc"],
  JPY:["Japanischer Yen","Japanese Yen"],CNY:["Chinesischer Yuan","Chinese Yuan"],AUD:["Australischer Dollar","Australian Dollar"],CAD:["Kanadischer Dollar","Canadian Dollar"],
};

const isFiat = (a:string)=>FIAT.includes(a);
const fmtNum = (v:number, a:string)=> new Intl.NumberFormat("de-DE",{maximumFractionDigits: isFiat(a)||a==="USDT"?2:8}).format(v||0);
const eur = (v:number)=> new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(v||0);

export default function AccountPortal(){
  const { p, lang } = useP();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState("wallet");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showKyc, setShowKyc] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey:["portal-wallet"],
    queryFn: async ()=>{
      const { data:{ session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portal/wallet`, { headers:{ Authorization:`Bearer ${session?.access_token}` }});
      if(!res.ok) throw new Error("wallet");
      return res.json();
    },
    refetchInterval: 15000,
  });

  const { data: me } = useQuery({ queryKey:["me"], queryFn: async ()=>{ const { data:{ user } } = await supabase.auth.getUser(); return user; } });
  const nombre = me?.user_metadata?.full_name || me?.user_metadata?.nombre || me?.email || "";

  const saldos: Record<string,number> = data?.saldos || {};
  const tasas: Record<string,number> = data?.tasas || {};
  const totalEur = data?.total_eur ?? 0;
  const movimientos = data?.movimientos || [];
  const retiros = data?.retiros || [];

  const holdings = useMemo(()=>ACTIVOS.map(a=>({a, v: saldos[a]||0, eur:(saldos[a]||0)*(tasas[a]||0)})).filter(h=>h.v>0).sort((x,y)=>y.eur-x.eur),[saldos,tasas]);

  async function cerrarSesion(){ await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); navigate("/login",{replace:true}); }

  return (
    <div className="client-area-page">
      <SiteLayout>
        <main className="client-area-shell">
          <div className="client-area-topbar">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary">← {p("Startseite","Home")}</Link>
            <div className="client-area-actions">
              <Button variant="ghost" onClick={cerrarSesion}><LogOut className="h-4 w-4"/> {p("Abmelden","Sign out")}</Button>
            </div>
          </div>

          <motion.header className="client-welcome" initial={reduceMotion?false:{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6, ease:[.22,1,.36,1]}}>
            <div className="client-welcome-heading">
              <div>
                <p>{p("Privater Bereich","Private area")}</p>
                <h1>{nombre ? p(`Hallo, ${nombre}`,`Hello, ${nombre}`) : p("Hallo","Hello")}</h1>
              </div>
              <button onClick={()=>setShowKyc(true)} className="account-pill" aria-label={p("Konto & Verifizierung öffnen","Open account & verification")}>
                <span className="account-pill-icon" aria-hidden="true"><span className="account-pill-ring"/><UserRound/></span>
                <span className="account-pill-text"><span className="account-pill-title">{p("Mein Konto","My account")}</span><span className="account-pill-sub">{p("Profil & KYC","Profile & KYC")}</span></span>
                <span className="account-pill-arrow" aria-hidden="true">→</span>
              </button>
            </div>
            <span>{p("Verfolgen Sie Ihr Guthaben, tauschen Sie Währungen und beantragen Sie Auszahlungen.","Track your balance, exchange currencies and request payouts.")}</span>
          </motion.header>

          {isLoading && <div className="client-loading"><Wallet/> {p("Ihr Konto wird vorbereitet…","Preparing your account…")}</div>}

          {!isLoading && data && (
            <Tabs value={tab} onValueChange={setTab} className="client-journey">
              <TabsList className="client-stage-tabs">
                <TabsTrigger value="wallet"><Wallet className="h-4 w-4"/> {p("Wallet","Wallet")}</TabsTrigger>
                <TabsTrigger value="exchange"><ArrowLeftRight className="h-4 w-4"/> {p("Tauschen","Exchange")}</TabsTrigger>
                <TabsTrigger value="withdraw"><ArrowDownToLine className="h-4 w-4"/> {p("Auszahlen","Withdraw")}</TabsTrigger>
                <TabsTrigger value="history"><History className="h-4 w-4"/> {p("Verlauf","History")}</TabsTrigger>
              </TabsList>

              {/* WALLET */}
              <TabsContent value="wallet" className="client-summary">
                <div className="client-summary-topline">
                  <span><Wallet/> {p("Mein Guthaben","My balance")}</span>
                  <span className="client-status-pill client-status-current"><TrendingUp/> {p("Live","Live")}</span>
                </div>
                <div className="exchange-hero">
                  <div className="exchange-hero-box exchange-hero-box-total">
                    <span className="exchange-hero-box-label">{p("Geschätzter Gesamtwert","Estimated total value")}</span>
                    <strong>{eur(totalEur)}</strong>
                  </div>
                  <div className="exchange-hero-breakdown">
                    {holdings.length===0 && <p className="exchange-hero-empty">{p("Noch kein Guthaben. Sobald Gelder aus Ihrem Fall zurückgewonnen wurden, erscheinen sie hier.","No balance yet. Once funds from your case are recovered, they will appear here.")}</p>}
                    {holdings.map(h=>(
                      <div key={h.a} className="exchange-hero-holding">
                        <span className={`exchange-asset-mark exchange-asset-mark--${h.a.toLowerCase()} is-active`}>{SIMBOLOS[h.a]}</span>
                        <div><strong>{fmtNum(h.v,h.a)} {h.a}</strong><small>{NOMBRES[h.a]?.[lang==="en"?1:0]}</small></div>
                        <span className="exchange-hero-holding-right">{eur(h.eur)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="client-withdrawal-actions">
                  <Button onClick={()=>setTab("exchange")}><ArrowLeftRight className="h-4 w-4"/> {p("Währung tauschen","Exchange currency")}</Button>
                  <Button variant="outline" onClick={()=>setShowWithdraw(true)}><ArrowDownToLine className="h-4 w-4"/> {p("Auszahlung beantragen","Request payout")}</Button>
                </div>
              </TabsContent>

              {/* EXCHANGE / SWAP */}
              <TabsContent value="exchange"><ExchangePanel saldos={saldos} tasas={tasas} onDone={()=>qc.invalidateQueries({queryKey:["portal-wallet"]})} p={p} lang={lang}/></TabsContent>

              {/* WITHDRAW */}
              <TabsContent value="withdraw" className="client-withdrawal-area">
                <div className="client-summary-copy">
                  <p>{p("Auszahlung beantragen","Request a payout")}</p>
                  <h3>{p("Überweisen Sie Ihr Guthaben","Transfer your balance")}</h3>
                  <p>{p("Verfügbar: ","Available: ")}{eur(totalEur)}</p>
                </div>
                <WithdrawalWizard totalEur={totalEur} banco={data?.banco} onSubmit={async ()=>{ await qc.invalidateQueries({queryKey:["portal-wallet"]}); }}/>
                {retiros.length>0 && (
                  <div className="client-request-history">
                    <h4>{p("Ihre Auszahlungen","Your payouts")}</h4>
                    {retiros.map((r:any)=>(
                      <div key={r.id} className="client-money-route">
                        <span className={`client-status-pill ${r.status==="approved"||r.status==="pagada"?"client-withdrawal-aprobada":r.status==="rejected"?"client-withdrawal-rechazada":""}`}>{r.status}</span>
                        <strong>{eur(r.eur_amount ?? r.amount)}</strong>
                        <small>{new Date(r.created_at).toLocaleDateString(lang==="en"?"en-GB":"de-DE")}</small>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* HISTORY */}
              <TabsContent value="history" className="client-transactions">
                <h4 className="client-kicker">{p("Bewegungen","Activity")}</h4>
                {movimientos.length===0 && <p className="client-empty">{p("Noch keine Bewegungen.","No activity yet.")}</p>}
                <div className="client-activity-list">
                  {movimientos.map((m:any)=>(
                    <div key={m.id} className="client-money-flow">
                      <span className="client-money-icon"><History/></span>
                      <div>
                        <strong>{m.tipo==="cambio"? p("Umtausch","Exchange") : m.tipo==="retirada"? p("Auszahlung","Payout") : m.tipo==="recuperacion"? p("Rückgewinnung","Recovery") : m.tipo}</strong>
                        <small>{new Date(m.created_at).toLocaleString(lang==="en"?"en-GB":"de-DE")}</small>
                      </div>
                      <span className="client-money-primary">
                        {m.tipo==="cambio" ? `${fmtNum(m.entregado,m.desde)} ${m.desde} → ${fmtNum(m.recibido,m.hacia)} ${m.hacia}` : m.importe? eur(m.importe): m.eur? eur(m.eur):""}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}

          <div className="client-contact-line">
            <ShieldCheck className="h-4 w-4"/> {p("Ihre Gelder werden sicher verwahrt. Fragen? ","Your funds are held securely. Questions? ")}<Link to="/kundenservice" className="text-primary">{p("Kundenservice","Customer service")}</Link>
          </div>
        </main>
      </SiteLayout>

      <Dialog open={showWithdraw} onOpenChange={setShowWithdraw}>
        <DialogContent className="client-account-dialog">
          <DialogHeader><DialogTitle>{p("Auszahlung beantragen","Request payout")}</DialogTitle></DialogHeader>
          <WithdrawalWizard totalEur={totalEur} banco={data?.banco} onSubmit={async ()=>{ setShowWithdraw(false); await qc.invalidateQueries({queryKey:["portal-wallet"]}); }}/>
        </DialogContent>
      </Dialog>

      <Dialog open={showKyc} onOpenChange={setShowKyc}>
        <DialogContent className="client-account-dialog">
          <DialogHeader><DialogTitle>{p("Mein Konto & Verifizierung","My account & verification")}</DialogTitle></DialogHeader>
          <ProfileKyc perfil={data?.banco ? null : null} onDone={()=>{ setShowKyc(false); qc.invalidateQueries({queryKey:["portal-wallet"]}); }}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ---------- Exchange / Swap panel ---------- */
function ExchangePanel({ saldos, tasas, onDone, p, lang }:{ saldos:Record<string,number>; tasas:Record<string,number>; onDone:()=>void; p:(a:string,b:string)=>string; lang:string }){
  const [desde, setDesde] = useState("BTC");
  const [hacia, setHacia] = useState("EUR");
  const [cantidad, setCantidad] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<any>(null);
  const [err, setErr] = useState("");

  const tasasArr = tasas||{};
  const amt = parseFloat(cantidad)||0;
  const bruto = amt*(tasasArr[desde]||0);
  const neto = bruto*(1-0.015);
  const recibido = tasasArr[hacia]? neto/tasasArr[hacia] : 0;
  const canSwap = amt>0 && desde!==hacia && (saldos[desde]||0)>=amt;

  async function doSwap(){
    setBusy(true); setErr("");
    try{
      const { data:{ session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portal/swap`,{ method:"POST", headers:{"Content-Type":"application/json", Authorization:`Bearer ${session?.access_token}`}, body: JSON.stringify({desde,hacia,cantidad:amt})});
      const j = await res.json();
      if(!res.ok) throw new Error(j.detail||"Fehler");
      setDone(j.movimiento); onDone();
    }catch(e:any){ setErr(e.message); }
    setBusy(false);
  }

  if(done) return (
    <div className="exchange-success client-summary">
      <div className="exchange-success-badge"><svg viewBox="0 0 72 72"><circle className="exchange-success-circle" cx="36" cy="36" r="31"/><path className="exchange-success-tick" d="M23 37.5 32 46.5 50 27"/></svg></div>
      <h3>{p("Tausch abgeschlossen","Exchange complete")}</h3>
      <div className="exchange-confirm-route">
        <div><span className={`exchange-asset-mark exchange-asset-mark--${done.desde.toLowerCase()}`}>{SIMBOLOS[done.desde]}</span><span><small>{p("Gegeben","Given")}</small><strong>{fmtNum(done.entregado,done.desde)} {done.desde}</strong></span></div>
        <ArrowLeftRight/>
        <div><span className={`exchange-asset-mark exchange-asset-mark--${done.hacia.toLowerCase()}`}>{SIMBOLOS[done.hacia]}</span><span><small>{p("Erhalten","Received")}</small><strong>{fmtNum(done.recibido,done.hacia)} {done.hacia}</strong></span></div>
      </div>
      <Button onClick={()=>{setDone(null); setCantidad("");}}>{p("Neuer Tausch","New exchange")}</Button>
    </div>
  );

  return (
    <div className="client-summary exchange-workspace">
      <div className="client-summary-topline"><span><ArrowLeftRight/> {p("Währung tauschen","Exchange currency")}</span><span className="client-status-pill client-status-current"><Lock/> 1,5% {p("Gebühr","fee")}</span></div>
      <div className="exchange-assets">
        <div className="exchange-field">
          <Label>{p("Von","From")}</Label>
          <select value={desde} onChange={e=>setDesde(e.target.value)} className="exchange-bank-select">
            {ACTIVOS.map(a=><option key={a} value={a} disabled={(saldos[a]||0)<=0}>{a} — {fmtNum(saldos[a]||0,a)}</option>)}
          </select>
          <Input inputMode="decimal" placeholder="0,00" value={cantidad} onChange={e=>setCantidad(e.target.value.replace(",","."))}/>
          <button type="button" className="exchange-max" onClick={()=>setCantidad(String(saldos[desde]||0))}>{p("MAX","MAX")}</button>
        </div>
        <button type="button" className="exchange-switch" onClick={()=>{setDesde(hacia); setHacia(desde);}} aria-label="swap"><ArrowLeftRight/></button>
        <div className="exchange-field exchange-field--receive">
          <Label>{p("Zu","To")}</Label>
          <select value={hacia} onChange={e=>setHacia(e.target.value)} className="exchange-bank-select">
            {ACTIVOS.filter(a=>a!==desde).map(a=><option key={a} value={a}>{a}</option>)}
          </select>
          <div className="exchange-locked-input">{recibido? fmtNum(recibido,hacia):"0,00"}</div>
        </div>
      </div>
      <div className="exchange-quote">
        <span>{p("Kurs","Rate")}: 1 {desde} ≈ {tasasArr[desde]&&tasasArr[hacia]? fmtNum(tasasArr[desde]/tasasArr[hacia],hacia):"—"} {hacia}</span>
        <span>{p("Gebühr (1,5 %)","Fee (1.5%)")}: {eur(bruto*0.015)}</span>
      </div>
      {err && <p className="exchange-validation">{err==="Saldo insuficiente"? p("Saldo nicht ausreichend","Insufficient balance"):err}</p>}
      <Button className="exchange-btn-confirm" disabled={!canSwap||busy} onClick={doSwap}>{busy? p("Wird verarbeitet…","Processing…") : p("Jetzt tauschen","Exchange now")}</Button>
      <p className="exchange-footnote"><ShieldCheck className="h-3 w-3"/> {p("Sichere Ausführung mit Live-Kursen.","Secure execution with live rates.")}</p>
    </div>
  );
}
