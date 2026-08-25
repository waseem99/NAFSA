const quickLinks = [
  'Market Access',
  'Regulatory Repository',
  'Accredited Laboratories',
  'Pest & Disease Alerts'
];

export default function Home() {
  return (
    <main>
      <section>
        <h1>National SPS Regulatory Information Platform</h1>
        <p>Trusted regulatory information for safe trade, compliance and stakeholder access.</p>
        <input placeholder="Search regulations, requirements, laboratories and alerts" />
      </section>

      <section>
        <h2>Quick Access</h2>
        <div>
          {quickLinks.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section>
        <h2>Trade Facilitation</h2>
        <p>Need transaction services? Visit Pakistan Single Window.</p>
      </section>
    </main>
  );
}
