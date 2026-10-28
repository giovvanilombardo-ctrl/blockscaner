import { useState } from "react";
import { ArrowDownToLine, Landmark, Wallet, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useP } from "@/i18n/portal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const eur = (v:number)=> new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(v||0);

function ibanOk(s:string){ const c=(s||"").replace(/\s+/g,"").toUpperCase(); return c.length>=15 && c.length<=34 && /^[A-Z]{2}[0-9A-Z]+$/.test(c); }

export function WithdrawalWizard({ totalEur, banco, onSubmit }:{ totalEur:number; banco:any; onSubmit:()=>Promise<void>|void }){
  const { p, lang } = useP();
  const [metodo, setMetodo] = useState<"banco"|"cripto">("banco");
  const [importe, setImporte] = useState("");
  const [titular, setTitular] = useState(banco?.titular||"");
  const [iban, setIban] = useState(banco?.iban||"");
  const [wallet, setWallet] = useState("");
  const [nota, setNota] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const amt = parseFloat(importe)||0;
  const valid = amt>0 && amt<=totalEur && (metodo==="banco" ? (titular.trim() && ibanOk(iban)) : wallet.trim().length>=10);

  async function submit(){
    setBusy(true); setErr("");
    try{
      const { data:{ session } } = await supabase.auth.getSession();
      const headers = {"Content-Type":"application/json", Authorization:`Bearer ${session?.access_token}`};
      const base = process.env.REACT_APP_BACKEND_URL;
      if(metodo==="banco"){
        await fetch(`${base}/api/portal/bank`,{method:"POST",headers,body:JSON.stringify({titular,iban})});
      }
      const res = await fetch(`${base}/api/portal/withdraw`,{method:"POST",headers,body:JSON.stringify({importe:amt,metodo,nota,wallet_address: metodo==="cripto"?wallet:undefined})});
      const j = await res.json();
      if(!res.ok) throw new Error(j.detail||"Fehler");
      setSent(true);
      await onSubmit();
    }catch(e:any){ setErr(e.message); }
    setBusy(false);
  }

  if(sent) return (
    <div className="exchange-success">
      <div className="exchange-success-badge"><svg viewBox="0 0 72 72"><circle className="exchange-success-circle" cx="36" cy="36" r="31"/><path className="exchange-success-tick" d="M23 37.5 32 46.5 50 27"/></svg></div>
      <h3>{p("Antrag eingereicht","Request submitted")}</h3>
      <p>{p("Ihre Auszahlung wird geprüft. Wir melden uns, sobald sie genehmigt ist.","Your payout is being reviewed. We'll notify you once approved.")}</p>
    </div>
  );

  return (
    <div className="client-withdrawal-form">
      <div className="exchange-assets" style={{gridTemplateColumns:"1fr 1fr", display:"grid", gap:"1rem"}}>
        <button type="button" onClick={()=>setMetodo("banco")} className={`exchange-bank-select ${metodo==="banco"?"exchange-fixed-asset":""}`}>
          <Landmark className="h-4 w-4"/> {p("Banküberweisung","Bank transfer")}
        </button>
        <button type="button" onClick={()=>setMetodo("cripto")} className={`exchange-bank-select ${metodo==="cripto"?"exchange-fixed-asset":""}`}>
          <Wallet className="h-4 w-4"/> {p("Krypto-Wallet","Crypto wallet")}
        </button>
      </div>

      <div className="exchange-field">
        <Label>{p("Betrag (EUR)","Amount (EUR)")}</Label>
        <Input inputMode="decimal" placeholder="0,00" value={importe} onChange={e=>setImporte(e.target.value.replace(",","."))}/>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <button type="button" className="exchange-max" onClick={()=>setImporte(String(totalEur.toFixed(2)))}>{p("MAX","MAX")}</button>
          <small className="exchange-conversion-hint">{p("Verfügbar","Available")}: {eur(totalEur)}</small>
        </div>
        {amt>totalEur && <p className="exchange-validation">{p("Betrag übersteigt das Guthaben","Amount exceeds balance")}</p>}
      </div>

      {metodo==="banco" ? (
        <div className="exchange-bank-grid">
          <div className="exchange-field"><Label>{p("Kontoinhaber","Account holder")}</Label><Input value={titular} onChange={e=>setTitular(e.target.value)} placeholder="Max Mustermann"/></div>
          <div className="exchange-field"><Label>IBAN</Label><Input value={iban} onChange={e=>setIban(e.target.value)} placeholder="DE89 3704 0044 0532 0130 00"/>{iban && !ibanOk(iban) && <p className="exchange-validation">{p("IBAN ungültig","Invalid IBAN")}</p>}</div>
        </div>
      ) : (
        <div className="exchange-field"><Label>{p("Wallet-Adresse","Wallet address")}</Label><Input value={wallet} onChange={e=>setWallet(e.target.value)} placeholder="bc1q…"/>{wallet && wallet.trim().length<10 && <p className="exchange-validation">{p("Adresse ungültig","Invalid address")}</p>}</div>
      )}

      <div className="exchange-field"><Label>{p("Notiz (optional)","Note (optional)")}</Label><Textarea value={nota} onChange={e=>setNota(e.target.value)} rows={2}/></div>

      {err && <p className="exchange-validation">{err==="Saldo insuficiente para esta retirada"? p("Guthaben nicht ausreichend","Insufficient balance"):err}</p>}
      <Button className="exchange-btn-confirm" disabled={!valid||busy} onClick={submit}>
        <ArrowDownToLine className="h-4 w-4"/> {busy? p("Wird gesendet…","Sending…") : p("Auszahlung beantragen","Request payout")}
      </Button>
      <p className="exchange-footnote"><ShieldCheck className="h-3 w-3"/> {p("Auszahlungen werden manuell geprüft (in der Regel 1–2 Werktage).","Payouts are reviewed manually (usually 1–2 business days).")}</p>
    </div>
  );
}
