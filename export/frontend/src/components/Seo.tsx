import { useEffect } from "react";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Per-route SEO: unique title + description + share-preview tags.
 *  No absolute URLs (canonical/og:url) until a production domain is confirmed. */
export default function Seo({ title, description }: { title: string; description?: string }) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:title", title);
      setMeta("property", "og:description", description);
      setMeta("name", "twitter:title", title);
      setMeta("name", "twitter:description", description);
    }
    return () => { document.title = prev; };
  }, [title, description]);
  return null;
}
