import { Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteLayout from "@/components/site/SiteLayout";
import TopicExperience from "@/components/site/TopicExperience";
import { sections } from "@/content/site";
import { helpTopics, type HelpTopic } from "@/content/helpTopics";
import { intelligenceTopics } from "@/content/topics/intelligence";
import { forschungTopics } from "@/content/topics/forschung";
import { praeventionTopics } from "@/content/topics/praevention";
import { toolsTopics } from "@/content/topics/tools";

const content: Record<string, HelpTopic[]> = { hilfe: helpTopics, intelligence: intelligenceTopics, forschung: forschungTopics, praevention: praeventionTopics, tools: toolsTopics };

const HelpTopicPage = ({ sectionKey = "hilfe", onResetCookies }: { sectionKey?: string; onResetCookies?: () => void }) => {
  const { slug } = useParams();
  const section = sections.find((s) => s.key === sectionKey);
  if (!section) return <Navigate to="/" replace />;
  const idx = section.topics.findIndex((topic) => topic.id === slug);
  const meta = section.topics[idx];
  const c = content[sectionKey]?.find((h) => h.id === slug);
  if (!meta || !c) return <Navigate to={section.path} replace />;
  return <SiteLayout onResetCookies={onResetCookies}>
    <Helmet><title>{`${meta.title} | Blockscaner`}</title><meta name="description" content={meta.summary}/><link rel="canonical" href={`https://blockchain-24.com${section.path}/${meta.id}`}/></Helmet>
    <TopicExperience c={c} meta={meta} section={section} idx={idx}/>
  </SiteLayout>;
};
export default HelpTopicPage;
