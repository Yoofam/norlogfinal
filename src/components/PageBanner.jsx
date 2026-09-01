export default function PageBanner({ eyebrow, title, detail }) {
  return (
    <div className="bg-charcoal text-paper border-b-4 border-safety">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="font-mono text-xs text-rust mb-3">{eyebrow}</p>
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        {detail && <p className="text-line mt-4 max-w-xl leading-relaxed">{detail}</p>}
      </div>
    </div>
  );
}
