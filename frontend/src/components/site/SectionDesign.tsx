import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Search, ShieldCheck, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/i18n';
import type { Section } from '@/content/site';
import { TopicPhoto, pagePhotos } from './topicDesign';
import { methodAnims } from './MethodAnim';
import './section-design.css';
function MethodAnim({step,className}:{step:number;className:string}) { const Visual=methodAnims[(step-1)%methodAnims.length]; return Visual?<div className={className} aria-hidden><Visual/></div>:null; }
export function SectionHeading({section:s,children}:{section:Section;children?:React.ReactNode}){
 return <section className={`section-heading section-heading-${s.key}`}>
 <div className="section-heading-copy"><p className="eyebrow text-primary">{s.index} / {s.label}</p><h1>{s.title}</h1><p>{s.lead}</p>{children}<Button asChild className="mt-7"><a href="#section-topics">{t('Inhalt')}<ArrowRight/></a></Button></div>
 <div className="section-heading-image">{pagePhotos[s.path]?<TopicPhoto name={pagePhotos[s.path]} eager/>:<MethodAnim step={7} className="section-heading-diagram"/>}{s.key==='tools'&&<div className="section-image-label"><Search/>Blockscout · Blockstream · GraphSense</div>}{s.key==='methodik'&&<div className="section-image-label"><ShieldCheck/>{t('Beobachtet')} / {t('Wahrscheinlich')} / {t('Möglich')}</div>}</div>
 </section>;
}
export function SectionTopics({section:s}:{section:Section}){
 const [selected,setSelected]=useState(0);
 if(s.key==='methodik') return <section id="section-topics" className="method-standards"><aside><p className="eyebrow">{s.label}</p><h2>{s.title}</h2><ol>{s.topics.map((x,i)=><li key={x.id}><a href={`#${x.id}`}>{String(i+1).padStart(2,'0')} {x.title}</a></li>)}</ol></aside><div>{s.topics.map((x,i)=><article key={x.id} id={x.id}><div className="method-standard-number">{String(i+1).padStart(2,'0')}</div><div><h2>{x.title}</h2><p>{x.summary}</p>{x.points&&<ul>{x.points.map(p=><li key={p}>{p}</li>)}</ul>}</div><MethodAnim step={(i%7)+1} className="method-standard-visual"/></article>)}</div></section>;
 if(s.key==='tools') return <section id="section-topics" className="tools-catalog"><header><p className="eyebrow">{s.label}</p><h2>{t('Quellen und Werkzeuge')}</h2></header><div>{s.topics.map((x,i)=><article key={x.id} id={x.id}><span className="catalog-num">{String(i+1).padStart(2,'0')}</span><h2>{x.title}</h2><p>{x.summary}</p><Button asChild variant="outline"><Link to={x.href??`#${x.id}`}>{t('Seite öffnen →')}<ArrowRight/></Link></Button></article>)}</div></section>;
 if(s.key==='hilfe')return <section id="section-topics" className="help-library"><header><p className="eyebrow">{s.label}</p><h2>{t('Ihre nächsten Schritte')}</h2></header>{s.topics.map((x,i)=><article key={x.id} id={x.id}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{x.title}</h2><p>{x.summary}</p></div><Button asChild variant="outline" size="icon"><Link to={x.href??`#${x.id}`} aria-label={x.title}><ArrowRight/></Link></Button></article>)}</section>;
 if(s.key==='intelligence')return <section id="section-topics" className="intelligence-library"><nav>{s.topics.map((x,i)=><Button key={x.id} onClick={()=>setSelected(i)} variant={selected===i?'default':'ghost'} aria-pressed={selected===i}>{String(i+1).padStart(2,'0')} {x.title}</Button>)}</nav><div><div className="intelligence-feature"><p className="eyebrow">{s.label}</p><h2>{s.topics[selected]?.title}</h2><p>{s.topics[selected]?.summary}</p><Button asChild><Link to={s.topics[selected]?.href??s.path}>{t('Seite öffnen →')}<ArrowRight/></Link></Button></div><div className="intelligence-links">{s.topics.map(x=><Link key={x.id} to={x.href??s.path}>{x.title}<ArrowRight size={16}/></Link>)}</div></div></section>;
 if(s.key==='forschung')return <section id="section-topics" className="research-library"><header><p className="eyebrow">{s.label}</p><h2>{t('Inhalt')}</h2></header><div>{s.topics.map((x,i)=><article key={x.id} id={x.id} className={i===0?'research-feature':''}><span>{String(i+1).padStart(2,'0')}</span><h2>{x.title}</h2><p>{x.summary}</p><Button asChild variant="link"><Link to={x.href??s.path}>{t('Seite öffnen →')}<ArrowRight/></Link></Button></article>)}</div></section>;
 if(s.key==='praevention')return <section id="section-topics" className="prevention-library"><header><p className="eyebrow">{s.label}</p><h2>{s.title}</h2></header><div>{s.topics.map((x,i)=><article key={x.id} id={x.id}><span>{String(i+1).padStart(2,'0')}</span><div><h2>{x.title}</h2><p>{x.summary}</p><Button asChild variant="link"><Link to={x.href??s.path}>{t('Seite öffnen →')}<ArrowRight/></Link></Button></div></article>)}</div></section>;
 return <section id="section-topics" className="about-library"><div>{s.topics.map(x=><details key={x.id} id={x.id} open><summary><h2>{x.title}</h2><ChevronDown/></summary><p>{x.summary}</p>{x.href&&<Button asChild variant="link"><Link to={x.href}>{t('Seite öffnen →')}</Link></Button>}</details>)}</div></section>;
}
