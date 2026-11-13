import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";

/* ---- hero artwork: mint banknote with ETH coin + fingerprint ---- */
const ArtEthereumNote = (
  <svg viewBox="0 0 340 210" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="210" fill="#c9f5dd"/>
    {/* banknote */}
    <rect x="46" y="34" width="248" height="142" rx="14" fill="#3ddc84"/>
    <rect x="46" y="34" width="248" height="142" rx="14" fill="none" stroke="#0d0d12" strokeWidth="4"/>
    <rect x="58" y="46" width="224" height="118" rx="8" fill="none" stroke="#0d0d12" strokeWidth="2" opacity=".5"/>
    {/* corner marks */}
    <path d="M58 60 q14 0 14 -14 M282 60 q-14 0 -14 -14 M58 150 q14 0 14 14 M282 150 q-14 0 -14 14" stroke="#0d0d12" strokeWidth="2.5" fill="none"/>
    {/* ETH coin */}
    <circle cx="120" cy="105" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <path d="M120 74 L138 106 L120 118 L102 106 Z" fill="#0d0d12"/>
    <path d="M120 74 L138 106 L120 100 Z" fill="#0d0d12" opacity=".55"/>
    {/* fingerprint circle */}
    <circle cx="214" cy="105" r="44" fill="#fff" stroke="#0d0d12" strokeWidth="4"/>
    <g fill="none" stroke="#0d0d12" strokeWidth="2.6">
      <path d="M214 84 a21 21 0 0 1 21 21"/><path d="M193 105 a21 21 0 0 1 12 -19"/>
      <path d="M214 93 a12 12 0 0 1 12 12"/><path d="M202 105 a12 12 0 0 1 6 -10"/>
      <path d="M214 101 a4 4 0 0 1 4 4 a4 4 0 0 1 -4 4"/>
      <path d="M226 118 a24 24 0 0 1 -22 10"/><path d="M196 118 a20 20 0 0 1 -6 -13"/>
    </g>
  </svg>
);

const ArtBitcoin = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffe9a8"/>
    <path d="M0 150 L60 70 L120 110 L220 30 V150 Z" fill="#0d0d12" opacity=".9"/>
    <circle cx="130" cy="66" r="30" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
    <text x="130" y="78" fontSize="30" fontWeight="800" textAnchor="middle" fill="#0d0d12">₿</text>
    <circle cx="70" cy="104" r="16" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
    <text x="70" y="110" fontSize="16" fontWeight="800" textAnchor="middle" fill="#0d0d12">Ł</text>
    <circle cx="48" cy="122" r="10" fill="#ffd23f" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

const ArtPopcat = (
  <svg viewBox="0 0 220 150" preserveAspectRatio="xMidYMid slice">
    <rect width="220" height="150" fill="#ffb3c7"/>
    <path d="M0 40 C40 10 80 20 110 50 C140 80 180 90 220 60 V0 H0 Z" fill="#0d0d12"/>
    <circle cx="110" cy="84" r="30" fill="#fff"/>
    <circle cx="110" cy="84" r="30" fill="none" stroke="#0d0d12" strokeWidth="3"/>
    <path d="M94 76 L90 66 L100 70 Z M126 76 L130 66 L120 70 Z" fill="#ff5f8f" stroke="#0d0d12" strokeWidth="2"/>
    <circle cx="100" cy="82" r="4" fill="#0d0d12"/><circle cx="120" cy="82" r="4" fill="#0d0d12"/>
    <ellipse cx="110" cy="94" rx="8" ry="10" fill="#0d0d12"/>
    <ellipse cx="110" cy="94" rx="4" ry="6" fill="#ff5f8f"/>
    <circle cx="52" cy="112" r="14" fill="#fff"/><circle cx="176" cy="108" r="10" fill="#fff"/>
    <circle cx="186" cy="46" r="12" fill="#ffb3c7" stroke="#0d0d12" strokeWidth="3"/>
  </svg>
);

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="ac-badge"><i />{children}</span>;
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="ac-tag">{children}</span>;
}
function Card({ tags, title, desc, date, mins, art }: {
  tags: string[]; title: string; desc: string; date: string; mins: number; art: React.ReactNode;
}) {
  return (
    <article className="ac-card">
      <div className="ac-thumb"><Badge>Beginner</Badge>{art}</div>
      <div className="ac-tags">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <h3>{_t(title)}</h3>
      <p className="ac-desc">{_t(desc)}</p>
      <p className="ac-meta">{date} • {mins} min</p>
    </article>
  );
}

export default function Academy() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Academy — Learn crypto, trading and economics" description="Guides, courses and market explainers — written to make crypto make sense." />
      <div className="ac-wrap" data-testid="academy-page">

        {/* Hero — featured article (exact reference layout) */}
        <section className="ac-hero" data-testid="academy-hero">
          <div className="ac-hero-copy">
            <Tag>Ethereum</Tag>
            <h1>{_t("The genesis of")}<br />{_t("Ethereum: the")}<br />{_t("story of the ICO")}</h1>
            <p className="ac-desc">{_t("The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs.")}</p>
            <p className="ac-meta">October 9, 2026&nbsp;&nbsp;•&nbsp;&nbsp;10 min</p>
          </div>
          <div className="ac-hero-thumb">
            <Badge>Beginner</Badge>
            {ArtEthereumNote}
          </div>
        </section>

        {/* Cryptocurrencies */}
        <section className="ac-cat">
          <div className="ac-cat-head">
            <h2>{_t("Cryptocurrencies")}</h2>
            <a className="ac-more" href="#" onClick={(e) => e.preventDefault()}>{_t("See more")}</a>
          </div>
          <div className="ac-grid">
            <Card tags={["Ethereum"]} title="The genesis of Ethereum: the story of the ICO"
              desc="The Ethereum ICO showcased an innovative fundraising model that inspired numerous projects and entrepreneurs."
              date="October 9, 2026" mins={10} art={ArtEthereumNote} />
            <Card tags={["Bitcoin"]} title="What is Bitcoin and how does it work?"
              desc="Bitcoin is the first cryptocurrency ever created, the most durable, strong and secure. Find out everything about its story and its functioning."
              date="October 8, 2026" mins={11} art={ArtBitcoin} />
            <Card tags={["Meme"]} title="Popcat: what it is and how it works"
              desc="POPCAT: what it is and how the 'pop' cat meme coin works"
              date="May 8, 2026" mins={7} art={ArtPopcat} />
          </div>
        </section>

      </div>
    </SiteLayout>
  );
}
