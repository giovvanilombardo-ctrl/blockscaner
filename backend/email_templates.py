"""Email sending via Emergent's managed email proxy (Resend), with the
structural guardrail gate. All templates are server-side fixed; callers only
supply data values, never recipients (except transactional mails to the
person who just submitted their own address), subjects or markup."""
import os
import re
import ipaddress
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse, quote

import httpx
from fastapi import HTTPException

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"  # constant on purpose
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Blockscaner")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "").rstrip("/")

# ---------------- Guardrail gate (managed-email playbook, copy as-is) ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    """Send one transactional email through the managed proxy. Returns id or None
    when no key is configured (logged mode, mirroring the original site)."""
    _assert_safe_email(subject, html)
    if not EMAIL_KEY:
        logger.info("No EMERGENT_EMAIL_KEY, skipping email to: %s", to)
        return None
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning("Email paused: %s (%s)", code, e.response.status_code)
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error("Email send failed: %s %s", e.response.status_code, e.response.text)
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Email send error: %s", str(e))
        raise HTTPException(status_code=500, detail="Failed to send email")


# ---------------- Templates ----------------

def track_pixel(email: str, session_id: str | None = None) -> str:
    if not FRONTEND_URL:
        return ""
    url = f"{FRONTEND_URL}/api/email-track?t=open&e={quote(email)}"
    if session_id:
        url += f"&s={quote(session_id)}"
    return f'<img src="{url}" width="1" height="1" style="display:none;" />'


def email_wrapper(content: str, recipient_email: str | None = None) -> str:
    pixel = track_pixel(recipient_email) if recipient_email else ""
    return f"""
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f0f1a;color:#e2e2e2;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:30px 24px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;letter-spacing:1px;">Blockscaner</h1>
        <p style="margin:6px 0 0;font-size:13px;color:#93c5fd;">Krypto-Rückgewinnungsdienst</p>
      </div>
      <div style="padding:28px 24px;">
        {content}
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1);padding:16px 24px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#888;">© Blockscaner | support@blockchain-24.com</p>
      </div>
    </div>
    {pixel}
    """


def otp_email(nombre: str, codigo: str, en: bool) -> tuple[str, str]:
    digits = "".join(
        f'<td style="padding:0 4px"><div style="width:46px;height:58px;line-height:58px;border:2px solid #93c5fd;border-radius:12px;background:#eff6ff;font-size:28px;font-weight:800;color:#0f172a;text-align:center;font-family:Arial">{d}</div></td>'
        for d in codigo
    )
    html = f"""<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f1f5f9">
  <div style="background:#0f172a;border-radius:20px;padding:30px;text-align:center;color:#fff">
    <div style="font-size:20px;font-weight:800;letter-spacing:2px">BLOCKSCANER</div>
    <h1 style="font-size:24px;margin:18px 0 8px">{"Verify your email" if en else "Bestätigen Sie Ihre E-Mail-Adresse"}</h1>
  </div>
  <div style="background:#fff;border-radius:20px;padding:28px;margin-top:14px;text-align:center;color:#334155">
    <p>{"Hello" if en else "Hallo"} {escape(nombre or "")}, {"use this code to activate your customer area:" if en else "mit diesem Code aktivieren Sie Ihren Kundenbereich:"}</p>
    <table role="presentation" align="center" style="margin:18px auto"><tr>{digits}</tr></table>
    <p style="font-size:13px">{"The code expires in 10 minutes. Never share it with anyone." if en else "Der Code läuft in 10 Minuten ab. Geben Sie ihn niemals weiter."}</p>
  </div>
  <p style="font-size:11px;color:#64748b;text-align:center;margin-top:16px">Blockscaner · support@blockchain-24.com</p></div>"""
    subject = f"{codigo} – {'your verification code' if en else 'Ihr Bestätigungscode'} · Blockscaner"
    return subject, html


def format_conversation(messages: list) -> str:
    if not messages:
        return "<p><em>Keine Nachrichten vorhanden</em></p>"
    out = []
    for msg in messages:
        role = "Kunde" if msg.get("role") == "user" else "Assistent"
        time = msg.get("timestamp", "")
        content = re.sub(r"\[FORM_COMPLETE\].*", "", msg.get("content") or "", flags=re.S).strip()
        if not content:
            continue
        color = "#3b82f6" if msg.get("role") == "user" else "#6b7280"
        out.append(
            f'<div style="margin-bottom:12px;padding:8px 12px;border-left:3px solid {color};background:#f9fafb;">'
            f"<strong>{role}</strong> <span style=\"color:#999;font-size:12px;\">{escape(str(time))}</span><br/>"
            f'<span style="white-space:pre-wrap;">{escape(content)}</span></div>'
        )
    return "".join(out) or "<p><em>Keine Nachrichten vorhanden</em></p>"


def abandoned_chat_html(session_id: str, messages: list) -> tuple[str, str]:
    subject = "Abgebrochenes Gespräch – Chat-Session"
    html = f"""
        <h2 style="color:#dc2626;">Abgebrochenes Chat-Gespräch</h2>
        <p>Ein Besucher hat das Gespräch verlassen, ohne es abzuschließen.</p>
        <p><strong>Session ID:</strong> {escape(session_id or "Unbekannt")}</p>
        <h3>Gesprächsverlauf:</h3>
        {format_conversation(messages)}
    """
    return subject, html


def lead_notification_html(lead: dict, doc_links: list[str], messages: list | None) -> tuple[str, str]:
    def row(label, value):
        return (f'<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">{label}</td>'
                f'<td style="padding:8px;border:1px solid #ddd;">{escape(str(value or ""))}</td></tr>')

    docs_html = ""
    if doc_links:
        items = "".join(f'<li><a href="{u}">Dokument ansehen</a></li>' for u in doc_links)
        docs_html = f"<h3>Hochgeladene Dokumente (Links 7 Tage gültig):</h3><ul>{items}</ul>"
    conversation_html = f"<h3>Vollständiger Gesprächsverlauf:</h3>{format_conversation(messages)}" if messages else ""

    subject = f"Neue Anfrage von {lead.get('vorname') or 'Unbekannt'} {lead.get('nachname') or ''} – {lead.get('betrugsart') or 'Krypto-Betrug'}"
    html = f"""
        <h2>Neue Kontaktanfrage – Blockchain Rückgewinnungsdienst</h2>
        <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
          {row("Name", f"{lead.get('vorname') or ''} {lead.get('nachname') or ''}")}
          {row("E-Mail", lead.get("email"))}
          {row("Telefon", lead.get("telefon"))}
          {row("Betrugsart", lead.get("betrugsart"))}
          {row("Kryptowährung", lead.get("kryptowaehrung"))}
          {row("Geschätzter Verlust", lead.get("verlorener_betrag"))}
          {row("Zeitraum", lead.get("wann"))}
          {row("Plattform", lead.get("plattform"))}
          {row("Wallet-Adresse", lead.get("wallet_adresse") or "Nicht angegeben")}
          {row("Polizeibericht", lead.get("polizeibericht"))}
          {row("Beschreibung", lead.get("beschreibung"))}
          {row("Bevorzugter Kontakt", lead.get("kontaktweg") or "—")}
        </table>
        {docs_html}
        {conversation_html}
    """
    return subject, html


def lead_confirmation_html(lead: dict) -> tuple[str, str]:
    first = escape(lead.get("vorname") or "Kunde")
    last = escape(lead.get("nachname") or "")
    email = lead.get("email") or ""
    html = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:30px 24px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:24px;">Blockscaner</h1>
            <p style="color:#93c5fd;margin:8px 0 0;font-size:14px;">Krypto-Rückgewinnungsdienst</p>
          </div>
          <div style="padding:32px 24px;">
            <h2 style="color:#1e3a5f;margin:0 0 16px;">Vielen Dank für Ihre Anfrage, {first} {last}!</h2>
            <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
              Wir haben Ihre Anfrage erfolgreich erhalten und unser Expertenteam hat bereits mit der Prüfung Ihres Falles begonnen.
            </p>
            <div style="background:#f0f9ff;border-left:4px solid #2563eb;padding:16px;border-radius:0 8px 8px 0;margin:20px 0;">
              <p style="color:#1e40af;margin:0;font-weight:bold;">Was passiert als Nächstes?</p>
              <ul style="color:#374151;margin:12px 0 0;padding-left:20px;line-height:1.8;">
                <li>Unser Team prüft die von Ihnen übermittelten Informationen</li>
                <li>Wir analysieren die Blockchain-Transaktionen</li>
                <li>Ein persönlicher Berater wird sich innerhalb von <strong>24 Stunden</strong> bei Ihnen melden</li>
              </ul>
            </div>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:20px 0;">
              <p style="color:#6b7280;margin:0 0 8px;font-size:13px;font-weight:bold;">Ihre Angaben im Überblick:</p>
              <table style="width:100%;font-size:14px;color:#374151;">
                <tr><td style="padding:4px 8px;font-weight:bold;">Betrugsart:</td><td style="padding:4px 8px;">{escape(str(lead.get("betrugsart") or "—"))}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Kryptowährung:</td><td style="padding:4px 8px;">{escape(str(lead.get("kryptowaehrung") or "—"))}</td></tr>
                <tr><td style="padding:4px 8px;font-weight:bold;">Geschätzter Verlust:</td><td style="padding:4px 8px;">{escape(str(lead.get("verlorener_betrag") or "—"))}</td></tr>
              </table>
            </div>
            <p style="color:#374151;line-height:1.6;">
              Falls Sie in der Zwischenzeit Fragen haben oder zusätzliche Unterlagen einreichen möchten, antworten Sie einfach auf diese E-Mail.
            </p>
            <p style="color:#374151;line-height:1.6;margin-top:24px;">
              Mit freundlichen Grüßen,<br/>
              <strong>Das Blockscaner Team</strong>
            </p>
          </div>
          <div style="background:#f9fafb;padding:16px 24px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">© Blockscaner | Krypto-Rückgewinnungsdienst</p>
          </div>
        </div>
        {track_pixel(email)}
    """
    return f"Ihre Anfrage wurde empfangen – Wir prüfen Ihren Fall, {first}!", html


def visitor_reminder_html(email: str) -> tuple[str, str]:
    chat_url = f"{FRONTEND_URL}/chat"
    home_url = FRONTEND_URL or "#"
    html = f"""
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1117;color:#e6edf3;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#1e3a5f,#2563eb);padding:30px 24px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#fff;">Blockscaner</h1>
        <p style="margin:6px 0 0;font-size:13px;color:#93c5fd;">Krypto-Rückgewinnungsdienst</p>
      </div>
      <div style="padding:32px 28px;">
        <h2 style="color:#fff;margin:0 0 12px;">Ihre kostenlose Ersteinschätzung wartet</h2>
        <p style="color:#c9d1d9;font-size:15px;line-height:1.7;">
          Sie haben sich für Informationen zur Rückgewinnung von Kryptowährungen angemeldet.
          Unser KI-Assistent hilft Ihnen, Ihren Fall in wenigen Minuten zu dokumentieren –
          kostenlos und unverbindlich.
        </p>
        <p style="color:#c9d1d9;font-size:13px;">Ihre Daten werden streng vertraulich behandelt.</p>
        <div style="text-align:center;padding:16px 0 24px;">
          <a href="{chat_url}" style="display:inline-block;background:linear-gradient(135deg,#1a56db,#0ea5e9);color:#ffffff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;">Jetzt kostenlos beraten lassen →</a>
        </div>
        <div style="background:rgba(234,179,8,0.1);border:1px solid rgba(234,179,8,0.25);border-radius:10px;padding:14px 18px;">
          <p style="margin:0;color:#eab308;font-size:13px;line-height:1.5;">
            <strong>Wichtiger Hinweis:</strong> Bei Krypto-Betrug ist schnelles Handeln entscheidend.
            Blockchain-Transaktionen können nachverfolgt werden — aber je länger Sie warten,
            desto schwieriger wird die Rückgewinnung.
          </p>
        </div>
        <p style="color:#8b949e;font-size:13px;margin-top:24px;">Alternativ können Sie uns direkt kontaktieren:</p>
        <p style="margin:0 0 4px;color:#e6edf3;font-size:13px;"><a href="mailto:support@blockchain-24.com" style="color:#1a56db;text-decoration:none;">support@blockchain-24.com</a></p>
        <p style="margin:0;color:#e6edf3;font-size:13px;"><a href="{home_url}" style="color:#1a56db;text-decoration:none;">Unsere Website besuchen</a></p>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #21262d;text-align:center;">
        <p style="margin:0 0 4px;color:#484f58;font-size:11px;">Sie erhalten diese E-Mail, weil Sie auf unserer Website Ihre E-Mail-Adresse hinterlassen haben.</p>
        <p style="margin:0;color:#484f58;font-size:11px;">© Blockscaner Rückgewinnungsdienst · Alle Rechte vorbehalten</p>
      </div>
    </div>
    {track_pixel(email)}
    """
    return "Ihre kostenlose Krypto-Ersteinschätzung wartet", html


def welcome_email(name: str, email: str, set_password_link: str, date: str) -> tuple[str, str]:
    content = f"""
      <h2 style="color:#60a5fa;margin:0 0 8px;">Willkommen, {escape(name)}!</h2>
      <p style="font-size:15px;line-height:1.6;color:#ccc;margin:0 0 20px;">
        Wir freuen uns, Sie bei Blockscaner begrüßen zu dürfen. Ihr persönliches Konto wurde soeben erstellt und ist ab sofort einsatzbereit.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:bold;color:#60a5fa;width:35%;">E-Mail</td>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e2e2;">{escape(email)}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-weight:bold;color:#60a5fa;">Erstellt am</td>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.08);color:#e2e2e2;">{escape(date)}</td>
        </tr>
      </table>
      <div style="text-align:center;margin:28px 0 8px;">
        <a href="{set_password_link}" style="display:inline-block;background:linear-gradient(135deg,#1e3a5f,#2563eb);color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px;">Konto aktivieren →</a>
      </div>
      <p style="font-size:13px;line-height:1.7;color:#999;margin:16px 0;">
        Über diesen Link (24 Stunden gültig) gelangen Sie in Ihren Kundenbereich. Unser Expertenteam überprüft bereits Ihren Fall und wird sich in Kürze persönlich bei Ihnen melden.
      </p>
    """
    return f"Willkommen bei Blockscaner, {name}!", email_wrapper(content, email)


def deposit_email(name: str, email: str, currency: str, amount, date: str) -> tuple[str, str]:
    content = f"""
      <h2 style="color:#60a5fa;margin:0 0 16px;">Einzahlung bestätigt</h2>
      <p style="font-size:15px;line-height:1.6;color:#ccc;">
        Hallo {escape(name)}, Ihrem Konto wurde eine Einzahlung gutgeschrieben.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:bold;color:#60a5fa;width:40%;">Betrag</td>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.1);color:#22c55e;font-weight:bold;font-size:18px;">{escape(str(amount))} {escape(str(currency))}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:bold;color:#60a5fa;">Datum</td>
          <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.1);color:#e2e2e2;">{escape(date)}</td>
        </tr>
      </table>
      <p style="font-size:14px;line-height:1.6;color:#999;">
        Sie können Ihr aktuelles Guthaben jederzeit in Ihrem Dashboard einsehen.
      </p>
      <div style="text-align:center;margin:24px 0 8px;">
        <a href="{FRONTEND_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#1e3a5f,#2563eb);color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">Dashboard öffnen →</a>
      </div>
    """
    return f"Einzahlung: {amount} {currency} – Blockscaner", email_wrapper(content, email)


def withdrawal_email(email: str, name: str, status: str, amount, currency: str,
                     eur_amount, withdraw_type: str, wallet_address, exchange_name,
                     fee_percentage, fee_amount, date: str) -> tuple[str, str]:
    is_approved = status == "approved"
    status_color = "#22c55e" if is_approved else "#ef4444"
    status_text = "✓ Genehmigt" if is_approved else "✗ Abgelehnt"
    message = ("Ihre Auszahlungsanfrage wurde genehmigt und wird in Kürze bearbeitet."
               if is_approved else
               "Ihre Auszahlungsanfrage wurde abgelehnt. Der Betrag wurde Ihrem Konto zurückgebucht.")
    type_labels = {
        "eur": "Banküberweisung (EUR)", "crypto": "Krypto-Wallet",
        "swap_to_crypto": "EUR → Krypto Tausch", "swap_to_eur": "Krypto → EUR Tausch", "swap": "Tausch",
    }

    def row(label, value, color="#e2e2e2", bold=False):
        style = f"padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.1);color:{color};{'font-weight:bold;' if bold else ''}"
        return (f'<tr><td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,0.1);font-weight:bold;color:#60a5fa;width:40%;">{label}</td>'
                f'<td style="{style}">{value}</td></tr>')

    rows = (
        row("Status", status_text, status_color, True)
        + row("Betrag", f"{escape(str(amount))} {escape(str(currency))}")
        + row("EUR-Wert", f"€{float(eur_amount or 0):.2f}")
        + row("Typ", escape(type_labels.get(withdraw_type, withdraw_type or "")))
        + row("Datum", escape(date))
    )
    if wallet_address:
        rows += row("Wallet-Adresse", escape(str(wallet_address)))
    if exchange_name:
        rows += row("Börse / Bank", escape(str(exchange_name)))
    if fee_percentage is not None and fee_amount is not None:
        rows += row("Gebühr", f"{escape(str(fee_percentage))}% (€{float(fee_amount):.2f})")

    content = f"""
      <h2 style="color:#60a5fa;margin:0 0 16px;">Auszahlungs-Update</h2>
      <p style="font-size:15px;line-height:1.6;color:#ccc;">Hallo {escape(name)}, {message}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">{rows}</table>
      <div style="text-align:center;margin:24px 0 8px;">
        <a href="{FRONTEND_URL}/dashboard" style="display:inline-block;background:linear-gradient(135deg,#1e3a5f,#2563eb);color:#fff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:15px;">Dashboard öffnen →</a>
      </div>
    """
    subject = (f"Auszahlung genehmigt: {amount} {currency} – Blockscaner" if is_approved
               else f"Auszahlung abgelehnt: {amount} {currency} – Blockscaner")
    return subject, email_wrapper(content, email)


def reset_password_html(email: str, link: str) -> tuple[str, str]:
    content = f"""
      <h2 style="color:#60a5fa;margin:0 0 16px;">Passwort zurücksetzen</h2>
      <p style="font-size:15px;line-height:1.6;color:#ccc;">
        Sie haben angefordert, das Passwort für Ihr Blockscaner-Konto zurückzusetzen.
        Klicken Sie auf die Schaltfläche, um ein neues Passwort festzulegen. Der Link ist 30 Minuten gültig.
      </p>
      <div style="text-align:center;margin:28px 0 8px;">
        <a href="{link}" style="display:inline-block;background:linear-gradient(135deg,#1e3a5f,#2563eb);color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px;">Neues Passwort festlegen →</a>
      </div>
      <p style="font-size:13px;line-height:1.7;color:#999;margin:16px 0;">
        Falls Sie diese Anfrage nicht gestellt haben, können Sie diese E-Mail ignorieren.
      </p>
    """
    return "Passwort zurücksetzen – Blockscaner", email_wrapper(content, email)
