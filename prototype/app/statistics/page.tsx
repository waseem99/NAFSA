export default function StatisticsPage() {
  const metrics = [
    'Regulatory Documents',
    'Accredited Laboratories',
    'Active Alerts',
    'Markets Covered'
  ];

  return (
    <main>
      <h1>NAFSA Statistics & Market Intelligence</h1>
      <p>Data-driven insights supporting SPS awareness and decision making.</p>
      {metrics.map((metric) => (
        <section key={metric}>
          <h2>{metric}</h2>
          <p>Dynamic dashboard indicator.</p>
        </section>
      ))}
    </main>
  );
}
