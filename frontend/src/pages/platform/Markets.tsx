import { useEffect, useState } from "react";
import { PageShell, CTAButtons } from "./_shell";
import { t as _t } from "@/i18n";
import { TrendingUp, TrendingDown } from "lucide-react";

const COINS = [
  { id:"bitcoin", sym:"BTC", name:"Bitcoin" },
  { id:"ethereum", sym:"ETH", name:"Ethereum" },
  { id:"tether", sym:"USDT", name:"Tether" },
  { id:"solana", sym:"SOL", name:"Solana" },
  { id:"binancecoin", sym:"BNB", name:"BNB" },
  { id:"ripple", sym:"XRP", name:"XRP" },
  { id:"cardano", sym:"ADA", name:"Cardano" },
  { id:"dogecoin", sym:"DOGE", name:"Dogecoin" },
];

export default function Markets(){
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${COINS.map(c=>c.id).join(",")}&price_change_percentage=24h`)
      .then(r=>r.json()).then(j=>{ setRows(Array.isArray(j)? j:[]); setLoading(false); })
      .catch(()=>setLoading(false));
  },[]);
  const eur = (v:number)=> new Intl.NumberFormat("en-GB",{style:"currency",currency:"EUR",maximumFractionDigits:v<1?4:2}).format(v||0);
  return (
    <PageShell kicker="Markets" title="Live crypto markets" lead="Real-time prices, 24-hour change and market data for the assets you can trade on Blockscaner.">
      <div className="pf-card" style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1.2fr 1fr 1.2fr",gap:"1rem",padding:"1rem 1.4rem",borderBottom:"1px solid #e2e8f0",fontSize:".68rem",letterSpacing:".12em",textTransform:"uppercase",color:"#64748b",fontWeight:700}}>
          <span>{_t("Asset")}</span><span style={{textAlign:"right"}}>{_t("Price")}</span><span style={{textAlign:"right"}}>24h</span><span style={{textAlign:"right"}}>{_t("Market cap")}</span>
        </div>
        {loading && <p style={{padding:"2.5rem",textAlign:"center",color:"#64748b"}}>{_t("Loading live prices…")}</p>}
        {!loading && rows.map((c)=>(
          <div key={c.id} style={{display:"grid",gridTemplateColumns:"2fr 1.2fr 1fr 1.2fr",gap:"1rem",padding:"1rem 1.4rem",borderBottom:"1px solid #f1f5f9",alignItems:"center"}}>
            <span style={{display:"flex",alignItems:"center",gap:".7rem"}}><img src={c.image} alt="" style={{width:26,height:26,borderRadius:"50%"}}/><b style={{fontSize:".9rem"}}>{c.name}</b><span style={{color:"#94a3b8",fontSize:".72rem"}}>{c.symbol.toUpperCase()}</span></span>
            <span style={{textAlign:"right",fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{eur(c.current_price)}</span>
            <span style={{textAlign:"right",display:"flex",justifyContent:"flex-end",alignItems:"center",gap:".3rem",fontWeight:700,color:(c.price_change_percentage_24h||0)>=0?"#16a34a":"#dc2626",fontVariantNumeric:"tabular-nums"}}>
              {(c.price_change_percentage_24h||0)>=0?<TrendingUp className="h-3.5 w-3.5"/>:<TrendingDown className="h-3.5 w-3.5"/>}{Math.abs(c.price_change_percentage_24h||0).toFixed(2)}%
            </span>
            <span style={{textAlign:"right",color:"#64748b",fontSize:".82rem",fontVariantNumeric:"tabular-nums"}}>{eur(c.market_cap)}</span>
          </div>
        ))}
      </div>
      <CTAButtons/>
    </PageShell>
  );
}
