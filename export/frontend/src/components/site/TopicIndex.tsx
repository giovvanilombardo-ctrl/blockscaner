import { t as _t } from "@/i18n";
import { Link } from "react-router-dom";
import type { Section } from "@/content/site";

/** Editorial topic listing with sticky index. `tone` switches between dark technical and calm paper layouts. */
const TopicIndex = ({ section, tone = "dark", columns = 1 }: { section: Section; tone?: "dark" | "paper"; columns?: 1 | 2 }) => {
  const paper = tone === "paper";
  return (
    <section className={`${paper ? "paper" : ""} px-6 lg:px-10 py-20`}>
      <div className="grid lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <nav aria-label={`Inhalt ${section.label}`} className="lg:sticky lg:top-32">
            <p className={`eyebrow mb-4 ${paper ? "!text-paper-foreground/60" : ""}`}>{_t("Inhalt")}</p>
            <ol className="space-y-1">
              {section.topics.map((t, i) => (
                <li key={t.id}>
                  <Link to={t.href ?? `#${t.id}`} className={`flex gap-3 py-1 text-[13px] ${paper ? "text-primary" : "text-primary"}`}>
                    <span className="font-mono text-[11px] w-5 opacity-60">{String(i + 1).padStart(2, "0")}</span>{t.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
        <div className={`lg:col-span-9 grid gap-x-12 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
          {section.topics.map((t, i) => (
            <article key={t.id} id={t.id} className={`scroll-mt-32 border-t py-10 ${paper ? "border-paper-foreground/15" : "border-border"}`}>
              <p className={`font-mono text-[11px] mb-3 ${paper ? "text-paper-foreground/50" : "text-muted-foreground"}`}>{section.index}.{String(i + 1).padStart(2, "0")}</p>
              <h2 className="font-display text-2xl md:text-3xl font-medium leading-tight mb-4">{t.title}</h2>
              <p className={`text-base leading-relaxed max-w-2xl ${paper ? "text-paper-foreground/80" : "text-muted-foreground"}`}>{t.summary}</p>
              {t.href && <Link to={t.href} className="mt-4 inline-block bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium">{_t("Seite öffnen →")}</Link>}
              {t.points && (
                <ul className="mt-5 space-y-2 max-w-2xl">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px]"><span className="mt-2.5 h-px w-4 shrink-0 bg-primary" />{p}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicIndex;
