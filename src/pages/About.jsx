import PageBanner from "../components/PageBanner";
import { useSiteSettings } from "../hooks/useSiteData";

export default function About() {
  const { settings } = useSiteSettings();

  return (
    <div>
      <PageBanner
        eyebrow="ABOUT"
        title="Built on-site, not in an office"
        detail={`${settings.company_name} started as a materials supplier to contractors and grew into a full site partner — machines, crews, and engineers included.`}
      />

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl text-charcoal mb-4">Who we work with</h2>
          <p className="text-steel leading-relaxed mb-4">
            Most of our clients are contractors mid-project who need a
            reliable supplier that won't hold up a pour. A growing share are
            homeowners managing their own build who want a single number to
            call instead of five separate vendors.
          </p>
          <p className="text-steel leading-relaxed">
            Every quote is reviewed by someone who has actually run a site,
            not just a sales desk — which is why our estimates tend to hold
            once work starts.
          </p>
        </div>

        <div className="bg-white border border-line p-8 h-fit">
          <h2 className="font-display text-xl text-charcoal mb-5">Contact</h2>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-steel text-xs uppercase font-mono mb-1">Phone</dt>
              <dd className="font-semibold text-charcoal">{settings.phone}</dd>
            </div>
            <div>
              <dt className="text-steel text-xs uppercase font-mono mb-1">Email</dt>
              <dd className="font-semibold text-charcoal">{settings.email}</dd>
            </div>
            <div>
              <dt className="text-steel text-xs uppercase font-mono mb-1">Site Office</dt>
              <dd className="font-semibold text-charcoal">{settings.address}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
