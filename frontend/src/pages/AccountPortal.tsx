import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard, Wallet, History, Landmark, UserRound, ShieldCheck,
  Bell, FileCheck, LifeBuoy, LogOut, ArrowLeftRight, ArrowDownToLine,
  Lock, CheckCircle2, ChevronRight, ArrowLeft, ArrowUpRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useP } from "@/i18n/portal";
import "@/account-portal.css";
import { WithdrawalWizard } from "@/components/account/WithdrawalWizard";
import { ProfileKyc } from "@/components/account/ProfileKyc";

const ACTIVOS = ["BTC","ETH","USDT","SOL","BNB","TRX","EUR","USD","GBP","CHF","JPY","CNY","AUD","CAD"];
const FIAT = ["EUR","USD","GBP","CHF","JPY","CNY","AUD","CAD"];
const SIMB: Record<string,string> = { BTC:"₿",ETH:"Ξ",USDT:"₮",SOL:"S",BNB:"B",TRX:"T",EUR:"€",USD:"$",GBP:"£",CHF:"₣",JPY:"¥",CNY:"元",AUD:"A$",CAD:"C$" };
const NOM: Record<string,[string,string]> = {
  BTC:["Bitcoin","Bitcoin"],ETH:["Ethereum","Ethereum"],USDT:["Tether","Tether"],SOL:["Solana","Solana"],BNB:["BNB","BNB"],TRX:["TRON","TRON"],
  EUR:["Euro","Euro"],USD:["US-Dollar","US Dollar"],GBP:["Britisches Pfund","British Pound"],CHF:["Schweizer Franken","Swiss Franc"],
  JPY:["Japanischer Yen","Japanese Yen"],CNY:["Chinesischer Yuan","Chinese Yuan"],AUD:["Australischer Dollar","Australian Dollar"],CAD:["Kanadischer Dollar","Canadian Dollar"],
};
const isFiat=(a:string)=>FIAT.includes(a);
const num=(v:number,a:string)=> new Intl.NumberFormat("de-DE",{maximumFractionDigits:isFiat(a)||a==="USDT"?2:8}).format(v||0);
const eur=(v:number)=> new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(v||0);

export default function AccountPortal(){
  const { p, lang } = useP();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const reduceMotion = useReducedMotion();
  const [view, setView] = useState("wallet");

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

  const nombre = me?.user_metadata?.full_name || me?.user_metadata?.nombre || "—";
  const email = me?.email || "";
  const initials = (nombre||"").split(/[\s@.]+/).filter(Boolean).slice(0,2).map((w:string)=>w[0]?.toUpperCase()).join("") || "B";

  const saldos: Record<string,number> = data?.saldos || {};
  const tasas: Record<string,number> = data?.tasas || {};
  const totalEur = data?.total_eur ?? 0;
  const movs = data?.movimientos || [];
  const retiros = data?.retiros || [];

  const holdings = useMemo(()=>ACTIVOS.map(a=>({a,v:saldos[a]||0,eur:(saldos[a]||0)*(tasas[a]||0)})).filter(h=>h.v>0),[saldos,tasas]);
  const criptoEur = holdings.filter(h=>!isFiat(h.a)).reduce((s,h)=>s+h.eur,0);
  const fiatEur = holdings.filter(h=>isFiat(h.a)).reduce((s,h)=>s+h.eur,0);
  const activos = holdings.length;

  async function logout(){ await qc.cancelQueries(); qc.clear(); await supabase.auth.signOut(); navigate("/login",{replace:true}); }

  const NAV = [
    { id:"overview", icon:LayoutDashboard, de:"Übersicht", en:"Overview", group:p("Guthaben","Funds") },
    { id:"wallet", icon:Wallet, de:"Mein Wallet", en:"My wallet", group:null },
    { id:"movements", icon:History, de:"Bewegungen", en:"Activity", group:null },
    { id:"withdraw", icon:Landmark, de:"Auszahlungen & Banken", en:"Payouts & banks", group:null },
    { id:"profile", icon:UserRound, de:"Persönliche Daten", en:"Personal data", group:p("Konto","Account") },
    { id:"security", icon:ShieldCheck, de:"Sicherheit", en:"Security", group:null },
    { id:"notifications", icon:Bell, de:"Benachrichtigungen", en:"Notifications", group:null },
    { id:"kyc", icon:FileCheck, de:"Verifizierung", en:"Verification", group:null },
  ];

  return (
    <div className="account-portal">
      <aside className="ap-sidebar">
        <div className="ap-user">
          <div className="ap-avatar">{initials}</div>
          <div style={{minWidth:0}}>
            <div className="ap-user-name">{nombre}</div>
            <div className="ap-user-mail">{email}</div>
          </div>
        </div>
        <div className="ap-total">
          <small>{p("Gesamtguthaben","Total balance")}</small>
          <strong>{eur(totalEur)}</strong>
        </div>
        <nav>
          {NAV.map(n=>{ const Icon=n.icon; return (
            <div key={n.id}>
              {n.group && <small>{n.group}</small>}
              <button className={`ap-nav-item ${view===n.id?"is-active":""}`} onClick={()=>setView(n.id)} data-testid={`nav-${n.id}`}>
                <Icon/> {p(n.de,n.en)}
              </button>
            </div>
          );})}
          <small>{p("Support","Support")}</small>
          <Link to="/kundenservice" className="ap-nav-item"><LifeBuoy/> {p("Hilfe","Help")}</Link>
        </nav>
        <button className="ap-nav-item ap-logout" onClick={logout}><LogOut/> {p("Abmelden","Sign out")}</button>
      </aside>

      <main className="ap-content">
        <div className="ap-topbar">
          <Link to="/" className="ap-back"><ArrowLeft className="h-4 w-4"/> {p("Zurück","Back")}</Link>
          <Link to="/dashboard" className="ap-link">{p("Zu meinem Fall","To my case")} →</Link>
        </div>

        {isLoading && <div className="ap-empty">{p("Ihr Konto wird geladen…","Loading your account…")}</div>}

        {!isLoading && data && (
          <motion.div initial={reduceMotion?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.5,ease:[.22,1,.36,1]}}>
            {view==="wallet" && <WalletView p={p} lang={lang} {...{saldos,tasas,totalEur,criptoEur,fiatEur,activos,setView}}/>}
            {view==="overview" && <OverviewView p={p} lang={lang} nombre={nombre} {...{saldos,tasas,totalEur,criptoEur,fiatEur,activos,retiros,movs,setView}} perfil={data} me={me}/>}
            {view==="movements" && <MovementsView p={p} lang={lang} movs={movs}/>}
            {view==="withdraw" && <WithdrawView p={p} lang={lang} totalEur={totalEur} banco={data?.banco} retiros={retiros} onDone={()=>qc.invalidateQueries({queryKey:["portal-wallet"]})}/>}
            {view==="profile" && <Card title={p("Persönliche Daten","Personal data")} kicker={p("Konto","Account")}><ProfileKyc onDone={()=>qc.invalidateQueries({queryKey:["portal-wallet"]})}/></Card>}
            {view==="kyc" && <Card title={p("Verifizierung","Verification")} kicker={p("Konto","Account")}><ProfileKyc onDone={()=>qc.invalidateQueries({queryKey:["portal-wallet"]})}/></Card>}
            {view==="security" && <Card title={p("Sicherheit","Security")} kicker={p("Konto","Account")}><SecurityView p={p}/></Card>}
            {view==="notifications" && <Card title={p("Benachrichtigungen","Notifications")} kicker={p("Konto","Account")}><NotificationsView p={p}/></Card>}
          </motion.div>
        )}
      </main>
    </div>
  );
}

function Card({title,kicker,children}:{title:string;kicker:string;children:React.ReactNode}){
  return (<div><p className="ap-kicker">{kicker}</p><h1 className="ap-title">{title}</h1><div className="ap-card">{children}</div></div>);
}

function WalletView({p,lang,saldos,tasas,totalEur,criptoEur,fiatEur,activos,setView}:any){
  return (<>
    <p className="ap-kicker">{p("Guthaben","Funds")}</p>
    <h1 className="ap-title">{p("Mein Wallet","My wallet")}</h1>
    <p className="ap-sub">{p("Verwalten Sie Ihre zurückgewonnenen Kryptowerte und sehen Sie deren indikativen Wert in Euro.","Manage your recovered crypto assets and see their indicative value in euros.")}</p>

    <div className="ap-card">
      <div className="ap-card-kicker"><Wallet className="h-3.5 w-3.5"/> {p("Krypto-Wallet","Crypto wallet")}</div>
      <div className="ap-summary">
        <div className="ap-sum">
          <small><span className="ap-coin c-BTC" style={{width:16,height:16,fontSize:9}}>₿</span> {p("Kryptowerte","Crypto assets")}</small>
          <b>{eur(criptoEur)}</b>
          <span>{criptoEur>0? p("Verfügbar","Available") : p("Keine Kryptowerte verfügbar","No crypto assets available")}</span>
        </div>
        <div className="ap-sum">
          <small><span className="ap-coin c-EUR" style={{width:16,height:16,fontSize:9}}>€</span> {p("Währungen","Currencies")}</small>
          <b>{eur(fiatEur)}</b>
          <span>{fiatEur>0? p("Verfügbar","Available") : p("Keine Währungen verfügbar","No currencies available")}</span>
        </div>
        <div className="ap-market">
          <b><span className="ap-dot"/> {p("Markt verfügbar","Market available")}</b>
          <span>{p("Indikative Kurse","Indicative rates")}</span>
        </div>
      </div>

      <div className="ap-banner">
        <Lock className="h-5 w-5"/>
        <div>
          <b>{p("Ihr Wallet wird aktiviert, sobald die ersten Kryptowerte zurückgewonnen sind","Your wallet activates once the first crypto assets are recovered")}</b>
          <p>{p("Sobald die Ermittlungen erfolgreich abgeschlossen sind, erscheinen die zurückgewonnenen Werte hier. Sie werden niemals als Euro gutgeschrieben.","Once the investigation concludes successfully, the recovered assets appear here. They are never credited as euros.")}</p>
        </div>
      </div>

      <div className="ap-list-head"><span>{p("Meine Werte","My assets")} · {activos} {p("mit Guthaben","with balance")}</span><span>{p("Wert EUR","Value EUR")}</span></div>
      <div>
        {ACTIVOS.filter(a=>!isFiat(a)).map(a=>{
          const v=saldos[a]||0; const e=v*(tasas[a]||0);
          return (
            <div key={a} className="ap-asset">
              <span className={`ap-coin c-${a}`}>{SIMB[a]}</span>
              <div><div className="ap-asset-name">{NOM[a]?.[lang==="en"?1:0]}</div><div className="ap-asset-sym">{a}</div></div>
              <div className="ap-asset-mid"><b>{num(v,a)}</b><small>{p("Verfügbar","Available")}</small></div>
              <div className="ap-asset-eur"><b>{eur(e)}</b><small>{tasas[a]? `${num(tasas[a],a)} € / ${a}`:"—"}</small></div>
              <ChevronRight className="ap-chev h-4 w-4"/>
            </div>
          );
        })}
      </div>

      <div className="ap-actions">
        <button className="ap-action" onClick={()=>setView("withdraw")}><ArrowDownToLine className="h-4 w-4"/> {p("Auszahlen (Bank)","Withdraw (bank)")}</button>
        <button className="ap-action ap-action--ghost" onClick={()=>setView("movements")}><History className="h-4 w-4"/> {p("Aktivität","Activity")}</button>
      </div>
    </div>

    <ExchangePanel p={p} saldos={saldos} tasas={tasas}/>
  </>);
}

function ExchangePanel({p,saldos,tasas}:any){
  const qc = useQueryClient();
  const [desde,setDesde]=useState("BTC"); const [hacia,setHacia]=useState("EUR");
  const [cantidad,setCantidad]=useState(""); const [busy,setBusy]=useState(false);
  const [done,setDone]=useState<any>(null); const [err,setErr]=useState("");
  const amt=parseFloat(cantidad)||0;
  const bruto=amt*(tasas[desde]||0); const neto=bruto*0.985; const recibido=tasas[hacia]?neto/tasas[hacia]:0;
  const can=amt>0 && desde!==hacia && (saldos[desde]||0)>=amt;
  async function go(){
    setBusy(true); setErr("");
    try{
      const { data:{ session } } = await supabase.auth.getSession();
      const res=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portal/swap`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${session?.access_token}`},body:JSON.stringify({desde,hacia,cantidad:amt})});
      const j=await res.json(); if(!res.ok) throw new Error(j.detail||"Fehler");
      setDone(j.movimiento); qc.invalidateQueries({queryKey:["portal-wallet"]});
    }catch(e:any){ setErr(e.message==="Saldo insuficiente"?p("Saldo nicht ausreichend","Insufficient balance"):e.message); }
    setBusy(false);
  }
  if(done) return (
    <div className="ap-card" style={{textAlign:"center",display:"grid",justifyItems:"center",gap:"0.6rem"}}>
      <CheckCircle2 className="h-10 w-10" style={{color:"#16a34a"}}/>
      <h3>{p("Tausch abgeschlossen","Exchange complete")}</h3>
      <p className="ap-sub">{num(done.entregado,done.desde)} {done.desde} → {num(done.recibido,done.hacia)} {done.hacia}</p>
      <button className="ap-action" onClick={()=>{setDone(null);setCantidad("");}}>{p("Neuer Tausch","New exchange")}</button>
    </div>
  );
  return (
    <div className="ap-card ap-exchange" style={{marginTop:"1.4rem"}}>
      <div>
        <p className="ap-kicker">{p("Sofortiger Tausch","Instant exchange")}</p>
        <h2 style={{fontSize:"1.3rem",fontWeight:800,margin:".3rem 0 1rem"}}>{p("Verkaufen oder tauschen","Sell or swap")} {desde}</h2>
        <div className="ap-field">
          <label>{p("Sie geben","You give")}</label>
          <div className="ap-field-row">
            <input inputMode="decimal" placeholder="0,00" value={cantidad} onChange={e=>setCantidad(e.target.value.replace(",","."))}/>
            <select className="ap-asset-pill" value={desde} onChange={e=>setDesde(e.target.value)}>
              {ACTIVOS.map(a=><option key={a} value={a} disabled={(saldos[a]||0)<=0}>{a}</option>)}
            </select>
          </div>
          <div className="ap-field-row" style={{marginTop:".4rem"}}>
            <button className="ap-mini" onClick={()=>setCantidad(String(saldos[desde]||0))}>{p("Maximum verwenden","Use max")}</button>
            <small style={{color:"#64748b",fontSize:".7rem"}}>{p("Verfügbar","Available")}: {num(saldos[desde]||0,desde)} {desde}</small>
          </div>
        </div>
        <div className="ap-field">
          <label>{p("Sie erhalten","You receive")}</label>
          <div className="ap-field-row">
            <input readOnly value={recibido? num(recibido,hacia):"0"}/>
            <select className="ap-asset-pill" value={hacia} onChange={e=>setHacia(e.target.value)}>
              {ACTIVOS.filter(a=>a!==desde).map(a=><option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
        <div className="ap-meta"><span>{p("Indikativer Kurs","Indicative rate")}</span><b>1 {desde} = {tasas[desde]&&tasas[hacia]?num(tasas[desde]/tasas[hacia],hacia):"—"} {hacia}</b></div>
        <div className="ap-meta"><span>{p("Gebühr (1,5 %)","Fee (1.5%)")}</span><b>{eur(bruto*0.015)}</b></div>
        <div className="ap-meta"><span>{p("Geschätzter Wert","Estimated value")}</span><b>{eur(neto)}</b></div>
        {err && <p className="ap-err">{err}</p>}
        <button className="ap-btn" disabled={!can||busy} onClick={go}>{busy? p("Wird verarbeitet…","Processing…") : p("Tausch prüfen","Review exchange")} →</button>
      </div>
      <div className="ap-panel">
        <h3 style={{fontSize:"1.05rem",fontWeight:800,marginBottom:".6rem"}}>{p("So funktioniert's","How it works")}</h3>
        <ol className="ap-howto">
          <li><span className="ap-stepnum">1</span><div><b>{p("Verkaufen:","Sell:")}</b><span>{p("tauschen Sie Krypto in Euro oder eine andere Währung.","swap crypto into euros or another currency.")}</span></div></li>
          <li><span className="ap-stepnum">2</span><div><b>{p("Kaufen:","Buy:")}</b><span>{p("nutzen Sie Ihre Euro oder Währungen, um wieder Krypto zu kaufen.","use your euros or currencies to buy crypto again.")}</span></div></li>
          <li><span className="ap-stepnum">3</span><div><b>{p("Auszahlen:","Withdraw:")}</b><span>{p("senden Sie Ihre Euro oder Währungen an Ihre Bank.","send your euros or currencies to your bank.")}</span></div></li>
        </ol>
        <p className="ap-note"><ShieldCheck className="h-3 w-3"/> {p("Zum Auszahlen auf die Bank verkaufen Sie zuerst Ihre Kryptowerte hier in Euro (oder eine andere Währung).","To withdraw to the bank, first sell your crypto here into euros (or another currency).")}</p>
      </div>
    </div>
  );
}

function OverviewView({p,lang,nombre,saldos,tasas,totalEur,retiros,movs,setView,perfil,me}:any){
  const pend = retiros.filter((r:any)=>r.status==="pending").length;
  const pct = (e:number)=> totalEur>0? Math.round((e/totalEur)*100) : 0;
  const hasTel = !!(me?.user_metadata?.telefono || perfil?.banco?.telefono);
  const checks = [
    { done:true, de:"E-Mail bestätigt", en:"Email confirmed" },
    { done:true, de:"Persönliche Daten vollständig", en:"Personal data complete" },
    { done:hasTel, de:"Kontakt-Telefon", en:"Contact phone" },
    { done:!!perfil?.banco, de:"Bankkonto hinterlegt", en:"Bank account registered" },
    { done:false, de:"Konto verifiziert", en:"Account verified" },
  ];
  const doneCount = checks.filter(c=>c.done).length;
  const lastMovs = movs.slice(0,4);

  return (<div className="ap-overview">
    <p className="ap-kicker">{p("Mein Konto","My account")}</p>
    <h1 className="ap-title">{nombre ? p(`Hallo, ${nombre}`,`Hello, ${nombre}`) : p("Hallo","Hello")}</h1>
    <p className="ap-sub">{p("Ihr persönliches Zentrum zum Ansehen, Verschieben und Abheben der zurückgewonnenen Gelder.","Your personal centre to view, move and withdraw the recovered funds.")}</p>

    {/* Hero balance card */}
    <div className="ap-hero">
      <div className="ap-hero-left">
        <small>{p("Gesamtwert deines Wallets","Total value of your wallet")}</small>
        <b>{eur(totalEur)}</b>
        <span>{pend>0? p(`${pend} Auszahlung(en) ausstehend`,`${pend} pending payout(s)`) : p("Keine Auszahlungen ausstehend","No pending payouts")}</span>
      </div>
      <div className="ap-hero-actions">
        <button onClick={()=>setView("wallet")}><ArrowLeftRight className="h-5 w-5"/><span>{p("Tauschen","Swap")}</span></button>
        <button onClick={()=>setView("withdraw")}><ArrowUpRight className="h-5 w-5"/><span>{p("Abheben","Withdraw")}</span></button>
        <button onClick={()=>setView("withdraw")}><Landmark className="h-5 w-5"/><span>{p("Banken","Banks")}</span></button>
        <button onClick={()=>setView("movements")}><ArrowDownToLine className="h-5 w-5"/><span>{p("Verlauf","Statement")}</span></button>
      </div>
    </div>

    {/* Asset distribution grid */}
    <div className="ap-card ap-dist">
      <div className="ap-dist-bar"/>
      <div className="ap-dist-grid">
        {ACTIVOS.map(a=>{
          const v=saldos[a]||0; const e=v*(tasas[a]||0); const has=v>0;
          return (
            <div key={a} className={`ap-dist-cell ${has?"has":""}`}>
              <div className="ap-dist-name">
                <span className={`ap-coin c-${a}`} style={{width:20,height:20,fontSize:10}}>{SIMB[a]}</span>
                <b>{NOM[a]?.[lang==="en"?1:0]}</b>
              </div>
              <div className="ap-dist-vals">
                <strong>{eur(e)}</strong>
                <small>{num(v,a)} {a} · {pct(e)}%</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Bottom two cards */}
    <div className="ap-overview-bottom">
      <div className="ap-card">
        <h3 className="ap-card-title">{p("Letzte Bewegungen","Latest activity")}</h3>
        {lastMovs.length===0 && <p className="ap-empty" style={{padding:"1.5rem 0"}}>{p("Noch keine Bewegungen.","No activity yet.")}</p>}
        {lastMovs.map((m:any)=>(
          <MovRow key={m.id} m={m} p={p} lang={lang}/>
        ))}
        <button className="ap-linkbtn" onClick={()=>setView("movements")}>{p("Alle ansehen","View all")}</button>
      </div>

      <div className="ap-card">
        <h3 className="ap-card-title">{p("Kontostand","Account status")}</h3>
        <div className="ap-progress"><div style={{width:`${(doneCount/checks.length)*100}%`}}/></div>
        <small className="ap-progress-label">{p(`${doneCount} von ${checks.length} abgeschlossen`,`${doneCount} of ${checks.length} completed`)}</small>
        <div className="ap-checklist">
          {checks.map((c,i)=>(
            <div key={i} className={`ap-check ${c.done?"done":""}`}>
              {c.done? <CheckCircle2 className="h-4 w-4"/> : <span className="ap-check-circle"/>}
              <span>{p(c.de,c.en)}</span>
            </div>
          ))}
        </div>
        <button className="ap-linkbtn" onClick={()=>setView("kyc")}>{p("Verifizierung ansehen","View verification")}</button>
      </div>
    </div>
  </div>);
}

/* Shared activity row — clear label, +/- amount, date */
function MovRow({m,p,lang}:{m:any;p:(a:string,b:string)=>string;lang:string}){
  const LABELS:Record<string,[string,string]>={
    cambio:["Tausch","Swap"],
    retirada:["Auszahlung beantragt","Payout requested"],
    retirada_aprobada:["Auszahlung genehmigt","Payout approved"],
    retirada_rechazada:["Auszahlung abgelehnt","Payout rejected"],
    recuperacion:["Rückgewinnung","Recovery"],
    deposito:["Einzahlung","Deposit"],
  };
  const tagCls = m.tipo==="deposito"||m.tipo==="recuperacion"||m.tipo==="retirada_aprobada" ? "ap-tag--ok"
    : m.tipo==="retirada" ? "ap-tag--pend"
    : m.tipo==="retirada_rechazada" ? "ap-tag--bad" : "ap-tag--pend";
  const [de,en] = LABELS[m.tipo] || [m.tipo,m.tipo];
  // sign & display value
  let sign="", value="";
  if(m.tipo==="cambio"){ value=`${num(m.entregado,m.desde)} ${m.desde} → ${num(m.recibido,m.hacia)} ${m.hacia}`; }
  else if(m.tipo==="deposito"||m.tipo==="recuperacion"){ sign="+"; value=eur(m.importe ?? m.eur ?? m.cantidad ?? 0); }
  else { sign="−"; value=eur(m.importe ?? m.eur ?? 0); }
  return (
    <div className="ap-table-row">
      <span className={`ap-tag ${tagCls}`}>{p(de,en)}</span>
      <div style={{flex:1}}><b className={sign==="+"?"ap-amt-pos":sign==="−"?"ap-amt-neg":""}>{sign}{value}</b></div>
      <small style={{color:"#64748b"}}>{new Date(m.created_at).toLocaleString(lang==="en"?"en-GB":"de-DE")}</small>
    </div>
  );
}

function MovementsView({p,lang,movs}:any){
  return (<>
    <p className="ap-kicker">{p("Guthaben","Funds")}</p>
    <h1 className="ap-title">{p("Bewegungen","Activity")}</h1>
    <p className="ap-sub">{p("Alle Transaktionen Ihres Wallets.","All your wallet transactions.")}</p>
    <div className="ap-card">
      {movs.length===0 && <div className="ap-empty">{p("Noch keine Bewegungen.","No activity yet.")}</div>}
      {movs.map((m:any)=>( <MovRow key={m.id} m={m} p={p} lang={lang}/> ))}
    </div>
  </>);
}

function WithdrawView({p,lang,totalEur,banco,retiros,onDone}:any){
  return (<>
    <p className="ap-kicker">{p("Guthaben","Funds")}</p>
    <h1 className="ap-title">{p("Auszahlungen & Banken","Payouts & banks")}</h1>
    <p className="ap-sub">{p("Überweisen Sie Ihr Guthaben auf Ihre Bank oder Krypto-Wallet.","Transfer your balance to your bank or crypto wallet.")}</p>
    <div className="ap-card">
      <div className="ap-meta" style={{marginBottom:"1rem"}}><span>{p("Verfügbar","Available")}</span><b>{eur(totalEur)}</b></div>
      <WithdrawalWizard totalEur={totalEur} banco={banco} onSubmit={onDone}/>
    </div>
    {retiros.length>0 && (
      <div className="ap-card">
        <div className="ap-card-kicker"><Landmark className="h-3.5 w-3.5"/> {p("Ihre Auszahlungen","Your payouts")}</div>
        {retiros.map((r:any)=>(
          <div key={r.id} className="ap-table-row">
            <span className={`ap-tag ${r.status==="approved"?"ap-tag--ok":r.status==="rejected"?"ap-tag--bad":"ap-tag--pend"}`}>{r.status}</span>
            <div style={{flex:1}}><b>{eur(r.eur_amount ?? r.amount)}</b></div>
            <small style={{color:"#64748b"}}>{new Date(r.created_at).toLocaleDateString(lang==="en"?"en-GB":"de-DE")}</small>
          </div>
        ))}
      </div>
    )}
  </>);
}

function SecurityView({p}:any){
  const [cur,setCur]=useState(""); const [nw,setNw]=useState(""); const [msg,setMsg]=useState(""); const [busy,setBusy]=useState(false);
  async function save(){
    setBusy(true); setMsg("");
    const { error } = await supabase.auth.updateUser({ password:nw, current_password:cur } as any);
    setMsg(error? p("Passwort konnte nicht geändert werden","Could not change password") : p("Passwort aktualisiert","Password updated"));
    setBusy(false);
  }
  return (<div>
    <div className="ap-grid2">
      <div><span className="ap-label">{p("Aktuelles Passwort","Current password")}</span><input type="password" className="ap-input" value={cur} onChange={e=>setCur(e.target.value)}/></div>
      <div><span className="ap-label">{p("Neues Passwort","New password")}</span><input type="password" className="ap-input" value={nw} onChange={e=>setNw(e.target.value)}/></div>
    </div>
    {msg && <p className="ap-note">{msg}</p>}
    <button className="ap-btn" style={{marginTop:"1rem",width:"auto",padding:".8rem 2rem"}} disabled={!cur||!nw||busy} onClick={save}><Lock className="h-4 w-4"/> {p("Passwort ändern","Change password")}</button>
  </div>);
}
function NotificationsView({p}:any){
  const [on,setOn]=useState<Record<string,boolean>>({email:true,payout:true,case:true});
  const Tog=({k,de,en}:any)=>(<div className="ap-table-row"><div style={{flex:1}}><b>{p(de,en)}</b></div>
    <button onClick={()=>setOn({...on,[k]:!on[k]})} className={`ap-tag ${on[k]?"ap-tag--ok":"ap-tag--pend"}`} style={{border:0,cursor:"pointer"}}>{on[k]?p("An","On"):p("Aus","Off")}</button></div>);
  return (<div>
    <Tog k="email" de="E-Mail-Benachrichtigungen" en="Email notifications"/>
    <Tog k="payout" de="Auszahlungs-Updates" en="Payout updates"/>
    <Tog k="case" de="Fall-Fortschritt" en="Case progress"/>
    <p className="ap-note"><Bell className="h-3 w-3"/> {p("Wählen Sie, worüber wir Sie informieren.","Choose what we notify you about.")}</p>
  </div>);
}
