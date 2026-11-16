import { t as _t } from "@/i18n";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { search } from "@/content/site";

const suggestions = [_t("Beweissicherung"), _t("Phishing"), _t("Wallet"), _t("Anzeige"), _t("Attribution")];

const SearchDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const results = search(q).slice(0, 8);

  useEffect(() => { if (open) { setQ(""); setTimeout(() => input.current?.focus(), 10); } }, [open]);
  useEffect(() => setActive(0), [q]);

  if (!open) return null;
  const go = (href: string) => { onClose(); nav(href); };

  return (
    <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={_t("Suche")}>
      <div className="w-full max-w-2xl border border-border bg-popover shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, results.length - 1));
              if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
              if (e.key === "Enter" && results[active]) go(results[active].href);
            }}
            placeholder={_t("Themen, Leitfäden, Methodik durchsuchen …")}
            className="h-14 flex-1 bg-transparent outline-none text-base"
            aria-label={_t("Suchbegriff")}
          />
          <kbd className="font-mono text-[10px] text-muted-foreground">ESC</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto" role="listbox">
          {!q && (
            <div className="p-5">
              <p className="eyebrow mb-3">{_t("Vorschläge")}</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => setQ(s)} className="border border-border px-3 py-1.5 text-xs hover:border-primary">{s}</button>
                ))}
              </div>
            </div>
          )}
          {q && results.length === 0 && (
            <p className="p-6 text-sm text-muted-foreground">{_t("Keine Treffer für „")}{q}{_t("“. Versuchen Sie einen allgemeineren Begriff oder öffnen Sie die")} <button className="text-primary underline" onClick={() => go("/sitemap")}>{_t("Sitemap")}</button>.</p>
          )}
          {results.map((r, i) => (
            <button key={r.href} role="option" aria-selected={i === active} onMouseEnter={() => setActive(i)} onClick={() => go(r.href)}
              className={`block w-full text-left px-5 py-3 border-b border-border ${i === active ? "bg-secondary" : ""}`}>
              <span className="eyebrow">{r.section}</span>
              <span className="block text-sm mt-1">{r.title}</span>
              <span className="block text-xs text-muted-foreground line-clamp-1">{r.summary}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
