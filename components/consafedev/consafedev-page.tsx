import { SiteHeader } from "./site-header";
import { SpatialStory } from "./spatial-story";
import { CapabilitiesSection } from "./capabilities-section";
import { TruthSection } from "./truth-section";
import { ContactSection } from "./contact-section";
import { SiteFooter } from "./site-footer";

export function ConSafeDevPage() {
  return (
    <>
      <a className="skip-link" href="#sistema">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main className="consafedev-page" id="inicio">
        <SpatialStory />
        <div className="clarity-world">
          <CapabilitiesSection />
          <TruthSection />
          <ContactSection />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
