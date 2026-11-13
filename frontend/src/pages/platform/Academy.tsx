import SiteLayout from "@/components/site/SiteLayout";
import Seo from "@/components/Seo";

export default function Academy() {
  return (
    <SiteLayout>
      <Seo title="Blockscaner Academy" description="Blockscaner Academy" />
      <div data-testid="academy-page" />
    </SiteLayout>
  );
}
