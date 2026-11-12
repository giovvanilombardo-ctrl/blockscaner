import { PageShell, CTAButtons } from "./_shell";
import { StepHero, StepPath, StepAcademy, StepPractice, StepCommunity } from "./Step";

export default function Products(){
  return (
    <PageShell kicker="Products" title="Everything you need to trade and invest in crypto" lead="One account to buy, hold, swap and grow your crypto — built for clarity, security and control." zoom={1.2}>
      <StepHero />
      <StepPath />
      <StepAcademy />
      <StepPractice />
      <StepCommunity />
      <CTAButtons/>
    </PageShell>
  );
}
