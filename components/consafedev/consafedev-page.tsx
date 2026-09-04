import { SiteHeader } from "./site-header";
import { SpatialStory } from "./spatial-story";
import { CapabilitiesSection } from "./capabilities-section";
import { TruthSection } from "./truth-section";
import { ContactSection } from "./contact-section";
import { SiteFooter } from "./site-footer";

export function ConSafeDevPage() {
  return (
    <main className="consafedev-page" id="inicio">
      <SiteHeader />
      <SpatialStory />
      <div className="clarity-world">
        <CapabilitiesSection />
        <TruthSection />
        <ContactSection />
        <SiteFooter />
      </div>
    </main>
  );
}
