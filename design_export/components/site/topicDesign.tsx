import government from '@/assets/topic-photos/beatriz-miller-jNak-nvP-38.jpg';
import bank from '@/assets/topic-photos/hudson-graves-wlJ7QToOZxI.jpg';
import office from '@/assets/topic-photos/arlington-research-WMdtbsQ5ouA.jpg';
import consultation from '@/assets/topic-photos/md-ishak-rahman-KH6lDyT6DzY.jpg';
import training from '@/assets/topic-photos/maxime-l1YgsfN8seY.jpg';
import support from '@/assets/topic-photos/berkeley-communications-WEDDt-u3q3o.jpg';
import review from '@/assets/topic-photos/md-ishak-rahman-kZUWdWDbV98.jpg';
import teamwork from '@/assets/topic-photos/jonathan-borba-K-yFktTaiZo.jpg';
import developer from '@/assets/topic-photos/studio-republic-qeij_dhDhGg.jpg';
import { L, type Bi } from '@/content/helpTopics';
export const photos = {
 government: {url:government, alt:['Deutscher Bundestag und deutsche Flagge','German parliament and flag'] as Bi},
 bank: {url:bank, alt:['Bankschalter','Bank service counter'] as Bi},
 office: {url:office, alt:['Menschen in einem offenen Büro','People in an open office'] as Bi},
 consultation: {url:consultation, alt:['Beratung an einem Arbeitsplatz','Consultation at a desk'] as Bi},
 training: {url:training, alt:['Schulung im Büro','Office training session'] as Bi},
 support: {url:support, alt:['Mann am Telefon hinter Computerbildschirmen','Man on the phone behind computer monitors'] as Bi},
 review: {url:review, alt:['Gemeinsame Prüfung von Unterlagen','Colleagues reviewing documents'] as Bi},
 teamwork: {url:teamwork, alt:['Zusammenarbeit am Computer','Colleagues working at a computer'] as Bi},
 developer: {url:developer, alt:['Arbeit an einem Computer im Büro','Working at a computer in an office'] as Bi},
};
export type PhotoKey=keyof typeof photos;
// Each photograph has one canonical placement, shared by both language versions.
export const pagePhotos: Record<string, PhotoKey> = {
 '/hilfe': 'consultation',
 '/blockchain-intelligence': 'developer',
 '/forschung': 'office',
 '/praevention': 'training',
 '/tools': 'teamwork',
 '/methodik': 'review',
 '/hilfe/anlagebetrug': 'bank',
 '/hilfe/meldewege': 'government',
 '/hilfe/phishing': 'support',
};
export type BodyDesign='protocol'|'conversation'|'dossier'|'reference'|'comparison'|'timeline'|'directory'|'workbench'|'journal'|'atlas';
export type HeroDesign='editorial'|'portrait'|'technical'|'wide'|'briefing'|'minimal';
export interface TopicDesign {body:BodyDesign;hero:HeroDesign;photo:PhotoKey;reverse?:boolean;}
const group=(body:BodyDesign,hero:HeroDesign,photo:PhotoKey,reverse=false):TopicDesign=>({body,hero,photo,reverse});
export const topicDesigns: Record<string,TopicDesign>={
 'hilfe/erste-schritte':group('protocol','briefing','support'),
 'hilfe/kryptobetrug':group('atlas','technical','developer'),
 'hilfe/anlagebetrug':group('dossier','portrait','bank'),
 'hilfe/phishing':group('conversation','editorial','support'),
 'hilfe/identitaetsdiebstahl':group('reference','wide','government'),
 'hilfe/kontouebernahme':group('workbench','briefing','developer'),
 'hilfe/ransomware':group('protocol','technical','teamwork',true),
 'hilfe/romance-scam':group('conversation','portrait','consultation',true),
 'hilfe/impersonation':group('comparison','wide','government'),
 'hilfe/wallet':group('workbench','minimal','developer'),
 'hilfe/beweissicherung':group('dossier','editorial','review'),
 'hilfe/meldewege':group('directory','portrait','government'),
 'hilfe/checklisten':group('reference','briefing','review'),
 'hilfe/faq':group('journal','minimal','support'),
 'hilfe/unterstuetzung':group('directory','wide','consultation',true),
 'intelligence/einfuehrung':group('journal','editorial','developer'),
 'intelligence/transaktionsdaten':group('reference','technical','teamwork'),
 'intelligence/adressen':group('atlas','minimal','developer'),
 'intelligence/block-explorer':group('directory','technical','developer'),
 'intelligence/token':group('workbench','portrait','developer'),
 'intelligence/graphen':group('atlas','wide','teamwork'),
 'intelligence/zeitanalyse':group('timeline','technical','review'),
 'intelligence/attribution':group('comparison','briefing','consultation'),
 'intelligence/on-off-chain':group('comparison','editorial','review',true),
 'intelligence/fallstudien':group('dossier','wide','teamwork'),
 'intelligence/dokumentation':group('reference','minimal','developer',true),
 'intelligence/analysefehler':group('protocol','portrait','review'),
 'forschung/veroeffentlichungen':group('journal','wide','office'),
 'forschung/betrugsmuster':group('atlas','briefing','training'),
 'forschung/technische-analysen':group('workbench','editorial','developer'),
 'forschung/bedrohungslandschaft':group('dossier','minimal','office'),
 'forschung/berichte':group('journal','portrait','review'),
 'forschung/datenanalysen':group('reference','technical','teamwork',true),
 'forschung/einschraenkungen':group('comparison','portrait','consultation'),
 'forschung/datenquellen':group('directory','editorial','office'),
 'forschung/korrekturen':group('timeline','minimal','review',true),
 'praevention/internet':group('journal','editorial','office',true),
 'praevention/passwoerter':group('workbench','technical','developer',true),
 'praevention/mfa':group('comparison','minimal','teamwork'),
 'praevention/wallet-sicherheit':group('protocol','portrait','developer',true),
 'praevention/webseiten':group('dossier','briefing','review',true),
 'praevention/nachrichten':group('conversation','minimal','support'),
 'praevention/social-engineering':group('conversation','wide','training'),
 'praevention/investitionen':group('comparison','portrait','bank',true),
 'praevention/geraete':group('workbench','wide','teamwork',true),
 'praevention/datenschutz-alltag':group('reference','editorial','consultation'),
 'praevention/glossar':group('directory','minimal','training',true),
 'tools/explorer':group('workbench','editorial','developer'),
 'tools/analyse':group('atlas','portrait','teamwork',true),
 'tools/visualisierung':group('timeline','wide','developer'),
 'tools/apis':group('reference','briefing','developer'),
 'tools/sicherheit':group('protocol','minimal','training'),
 'tools/evidence':group('dossier','technical','review'),
 'tools/lizenzen':group('directory','portrait','office',true),
 'tools/grenzen':group('comparison','technical','consultation',true),
};
export function TopicPhoto({name,className='',eager=false}:{name:PhotoKey;className?:string;eager?:boolean}) {
 const p=photos[name];return <img src={p.url} alt={L(p.alt)} className={className} loading={eager?'eager':'lazy'} />;
}
