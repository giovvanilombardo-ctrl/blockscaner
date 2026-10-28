import { useState } from "react";
import { ShieldCheck, UserRound, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useP } from "@/i18n/portal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LAENDER = ["Deutschland","Österreich","Schweiz","Spanien","Frankreich","Italien","Niederlande"];
const DOCS: [string,string][] = [["Personalausweis","ID card"],["Reisepass","Passport"],["Führerschein","Driving licence"]];

export function ProfileKyc({ onDone }:{ perfil?:any; onDone:()=>void }){
  const { p, lang } = useP();
  const [form, setForm] = useState({ nombre:"", apellidos:"", telefono:"" });
  const [kyc, setKyc] = useState({ geburtsdatum:"", land:"Deutschland", dokumenttyp:"Personalausweis", dokumentnummer:"", adresse:"", plz:"", stadt:"" });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState("");

  useState(()=>{ (async()=>{ const { data:{ user } } = await supabase.auth.getUser(); if(user?.user_metadata){ setForm({ nombre:user.user_metadata.nombre||"", apellidos:user.user_metadata.apellidos||"", telefono:"" }); } })(); });

  async function save(){
    setBusy(true); setErr("");
    try{
      const { data:{ session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/portal/profile`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${session?.access_token}`},body:JSON.stringify({...form, kyc})});
      if(!res.ok) throw new Error("Fehler");
      setSaved(true); setTimeout(onDone, 900);
    }catch(e:any){ setErr(e.message); }
    setBusy(false);
  }

  if(saved) return (
    <div className="exchange-success">
      <div className="exchange-success-badge"><svg viewBox="0 0 72 72"><circle className="exchange-success-circle" cx="36" cy="36" r="31"/><path className="exchange-success-tick" d="M23 37.5 32 46.5 50 27"/></svg></div>
      <h3>{p("Gespeichert","Saved")}</h3>
      <p>{p("Ihre Daten wurden aktualisiert.","Your details were updated.")}</p>
    </div>
  );

  return (
    <div className="client-edit-profile">
      <div className="client-account-grid">
        <div className="client-account-section">
          <p className="client-kicker"><UserRound className="h-3 w-3"/> {p("Profil","Profile")}</p>
          <div className="exchange-field"><Label>{p("Vorname","First name")}</Label><Input value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/></div>
          <div className="exchange-field"><Label>{p("Nachname","Last name")}</Label><Input value={form.apellidos} onChange={e=>setForm({...form,apellidos:e.target.value})}/></div>
          <div className="exchange-field"><Label>{p("Telefon","Phone")}</Label><Input value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})} placeholder="+49 …"/></div>
        </div>
        <div className="client-account-section">
          <p className="client-kicker"><ShieldCheck className="h-3 w-3"/> {p("Verifizierung (KYC)","Verification (KYC)")}</p>
          <div className="exchange-field"><Label>{p("Geburtsdatum","Date of birth")}</Label><Input type="date" value={kyc.geburtsdatum} onChange={e=>setKyc({...kyc,geburtsdatum:e.target.value})}/></div>
          <div className="exchange-field"><Label>{p("Land","Country")}</Label>
            <select className="exchange-bank-select" value={kyc.land} onChange={e=>setKyc({...kyc,land:e.target.value})}>{LAENDER.map(l=><option key={l}>{l}</option>)}</select></div>
          <div className="exchange-field"><Label>{p("Ausweisdokument","ID document")}</Label>
            <select className="exchange-bank-select" value={kyc.dokumenttyp} onChange={e=>setKyc({...kyc,dokumenttyp:e.target.value})}>{DOCS.map(([d,en])=><option key={d} value={d}>{p(d,en)}</option>)}</select></div>
          <div className="exchange-field"><Label>{p("Dokumentnummer","Document number")}</Label><Input value={kyc.dokumentnummer} onChange={e=>setKyc({...kyc,dokumentnummer:e.target.value})}/></div>
          <div className="exchange-field"><Label>{p("Adresse","Address")}</Label><Input value={kyc.adresse} onChange={e=>setKyc({...kyc,adresse:e.target.value})}/></div>
          <div className="exchange-bank-grid">
            <div className="exchange-field"><Label>{p("PLZ","Postcode")}</Label><Input value={kyc.plz} onChange={e=>setKyc({...kyc,plz:e.target.value})}/></div>
            <div className="exchange-field"><Label>{p("Stadt","City")}</Label><Input value={kyc.stadt} onChange={e=>setKyc({...kyc,stadt:e.target.value})}/></div>
          </div>
        </div>
      </div>
      {err && <p className="exchange-validation">{err}</p>}
      <Button className="exchange-btn-confirm" disabled={busy} onClick={save}><CheckCircle2 className="h-4 w-4"/> {busy? p("Speichern…","Saving…") : p("Speichern","Save")}</Button>
      <p className="exchange-footnote"><ShieldCheck className="h-3 w-3"/> {p("Ihre Daten werden DSGVO-konform und vertraulich behandelt.","Your data is handled confidentially and in compliance with GDPR.")}</p>
    </div>
  );
}
