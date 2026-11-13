import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";
import { t as _t } from "@/i18n";
import { Linkedin } from "lucide-react";

import alexImg from "@/assets/leaders/alexandru-stefan-gheban.png";
import andreaImg from "@/assets/leaders/andrea-ferrero.png";
import edoardoImg from "@/assets/leaders/edoardo-guerrieri.png";
import giorgioImg from "@/assets/leaders/giorgio-medda.png";
import nicolasImg from "@/assets/leaders/nicolas-bertrand.png";
import salvatoreImg from "@/assets/leaders/salvatore-sberna.png";
import ryanImg from "@/assets/leaders/exec-ryan-morris.png";
import lucasImg from "@/assets/leaders/exec-lucas-ward.png";
import oliverImg from "@/assets/leaders/exec-oliver-knight.png";
import noahImg from "@/assets/leaders/exec-noah-price.png";

const LEADERS = [
  { name: "Ryan Morris", role: "Co-CEO & CFO & Co-founder", img: ryanImg },
  { name: "Ethan Blake", role: "Co-CEO & Co-founder", img: andreaImg },
  { name: "Daniel Brooks", role: "Member Board Of Directors", img: edoardoImg },
  { name: "Thomas Hale", role: "Member Board Of Directors", img: giorgioImg },
  { name: "Victor Grant", role: "Chairman & Member Board Of Directors", img: nicolasImg },
  { name: "James Ellis", role: "Member Board Of Directors", img: salvatoreImg },
];

const EXECUTIVES = [
  { name: "Ryan Morris", role: "Co-CEO & CFO & Co-founder", img: ryanImg },
  { name: "Lucas Ward", role: "Co-CEO & Co-founder", img: lucasImg },
  { name: "Oliver Knight", role: "Chief Experience Officer", img: oliverImg },
  { name: "Noah Price", role: "Chief Technology Officer & Co-founder", img: noahImg },
];

const FOUNDERS = [
  { name: "Ryan Morris", role: "Co-CEO & CFO & Co-founder", img: ryanImg },
  { name: "Lucas Ward", role: "Co-CEO & Co-founder", img: lucasImg },
  { name: "Noah Price", role: "Chief Technology Officer & Co-founder", img: noahImg },
  { name: "Marco Rossi", role: "Co-founder", img: andreaImg },
];

const ADVISORS = [
  { name: "Luka Horvat", role: "Legal Advisor", img: alexImg },
  { name: "Ivan Kovač", role: "Strategy Advisor", img: giorgioImg },
  { name: "Alessandro Bianchi", role: "Technology Advisor", img: edoardoImg },
];

export default function Leadership() {
  return (
    <SiteLayout>
      <Seo title="Leadership — Blockscaner" description="Different backgrounds, shared vision. Meet the Blockscaner Board of Directors." />
      <div className="lead-page" data-testid="leadership-page">
        <header className="lead-head">
          <h1>{_t("Leadership")}</h1>
          <p>{_t("Different backgrounds, shared vision.")}</p>
        </header>

        <section className="lead-board">
          <h2>{_t("Board of Directors")}</h2>
          <div className="lead-grid">
            {LEADERS.map((p) => (
              <article key={p.name} className="lead-card" data-testid={`leader-${p.name.split(" ")[0].toLowerCase()}`}>
                <div className="lead-photo">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="lead-info">
                  <div className="lead-name-row">
                    <h3>{p.name}</h3>
                    <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${p.name} on LinkedIn`} className="lead-li">
                      <Linkedin size={16} />
                    </a>
                  </div>
                  <p>{p.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-board">
          <h2>{_t("Executive Leadership")}</h2>
          <div className="lead-grid">
            {EXECUTIVES.map((p) => (
              <article key={p.name} className="lead-card" data-testid={`exec-${p.name.split(" ")[0].toLowerCase()}`}>
                <div className="lead-photo">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="lead-info">
                  <div className="lead-name-row">
                    <h3>{p.name}</h3>
                    <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${p.name} on LinkedIn`} className="lead-li">
                      <Linkedin size={16} />
                    </a>
                  </div>
                  <p>{p.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-board">
          <h2>{_t("Founders")}</h2>
          <div className="lead-grid">
            {FOUNDERS.map((p) => (
              <article key={p.name} className="lead-card" data-testid={`founder-${p.name.split(" ")[0].toLowerCase()}`}>
                <div className="lead-photo">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="lead-info">
                  <div className="lead-name-row">
                    <h3>{p.name}</h3>
                    <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${p.name} on LinkedIn`} className="lead-li">
                      <Linkedin size={16} />
                    </a>
                  </div>
                  <p>{p.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-board">
          <h2>{_t("Advisors")}</h2>
          <div className="lead-grid">
            {ADVISORS.map((p) => (
              <article key={p.name} className="lead-card" data-testid={`advisor-${p.name.split(" ")[0].toLowerCase()}`}>
                <div className="lead-photo">
                  <img src={p.img} alt={p.name} loading="lazy" />
                </div>
                <div className="lead-info">
                  <div className="lead-name-row">
                    <h3>{p.name}</h3>
                    <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${p.name} on LinkedIn`} className="lead-li">
                      <Linkedin size={16} />
                    </a>
                  </div>
                  <p>{p.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
