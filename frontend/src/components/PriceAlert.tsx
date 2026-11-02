import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { t as _t } from "@/i18n";
import { Bell, Trash2, CheckCircle2 } from "lucide-react";

const eur = (v: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(v || 0);

type Alert = { id: string; coin_id: string; sym: string; name: string; target_price: number; direction: string; active: boolean; trigger_price?: number };

export default function PriceAlert({ coinId, sym, name, current }: { coinId: string; sym: string; name: string; current?: number }) {
  const API = process.env.REACT_APP_BACKEND_URL;
  const [token, setToken] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [target, setTarget] = useState("");
  const [direction, setDirection] = useState<"above" | "below">("above");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setToken(session?.access_token || null));
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/alerts`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : []))
      .then((j) => setAlerts(Array.isArray(j) ? j.filter((a: Alert) => a.coin_id === coinId) : []))
      .catch(() => {});
  }, [token, coinId, API]);

  const create = async () => {
    const t = parseFloat(target.replace(",", "."));
    if (!t || t <= 0) { setMsg(_t("Enter a valid target price.")); return; }
    setBusy(true); setMsg("");
    try {
      const r = await fetch(`${API}/api/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ coin_id: coinId, sym, name, target_price: t, direction }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.detail || "error");
      setAlerts((prev) => [j, ...prev]);
      setTarget("");
      setMsg(_t("Alert created. We will email you when the target is reached."));
    } catch (e: any) {
      setMsg(e.message === "alert limit reached" ? _t("Alert limit reached (20 active alerts).") : _t("Could not create the alert. Try again."));
    }
    setBusy(false);
  };

  const remove = async (id: string) => {
    await fetch(`${API}/api/alerts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <section className="cd-section pa-box" data-testid="price-alert-box">
      <h2><Bell className="h-5 w-5" style={{ display: "inline", verticalAlign: "-3px" }} /> {_t("Price alert")}</h2>
      {!token ? (
        <p>
          {_t("Log in to get an email when")} {name} {_t("reaches your target price.")}{" "}
          <Link to="/login" className="cd-link" data-testid="price-alert-login-link">{_t("Log in")}</Link>
        </p>
      ) : (
        <>
          <div className="pa-form">
            <span className="pa-when">{sym} {_t("moves")}</span>
            <select value={direction} onChange={(e) => setDirection(e.target.value as any)} className="pa-select" data-testid="price-alert-direction-select">
              <option value="above">{_t("above")}</option>
              <option value="below">{_t("below")}</option>
            </select>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={current ? `${_t("e.g.")} ${(current * (direction === "above" ? 1.1 : 0.9)).toFixed(2)}` : "0.00"}
              inputMode="decimal"
              className="pa-input"
              data-testid="price-alert-target-input"
            />
            <span className="pa-when">EUR</span>
            <button onClick={create} disabled={busy} className="cd-btn-primary pa-btn" data-testid="price-alert-create-btn">
              {busy ? _t("Saving…") : _t("Notify me")}
            </button>
          </div>
          {current ? <p className="pa-current">{_t("Current price")}: {eur(current)}</p> : null}
          {msg && <p className="pa-msg" data-testid="price-alert-message">{msg}</p>}
          {alerts.length > 0 && (
            <ul className="pa-list" data-testid="price-alert-list">
              {alerts.map((a) => (
                <li key={a.id} className="pa-item">
                  {a.active ? <Bell className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" style={{ color: "#16a34a" }} />}
                  <span>
                    {a.sym} {a.direction === "above" ? "≥" : "≤"} {eur(a.target_price)}
                    {!a.active && a.trigger_price ? ` — ${_t("triggered at")} ${eur(a.trigger_price)}` : ""}
                  </span>
                  <button onClick={() => remove(a.id)} className="pa-del" aria-label="delete" data-testid={`price-alert-delete-${a.id}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
