export default function AlertsPage() {
  const alerts = [
    { level: 'High', title: 'Pest Alert - Regional Risk Update', location: 'Punjab' },
    { level: 'Medium', title: 'Food Safety Notification', location: 'National' },
    { level: 'Low', title: 'Regulatory Advisory Update', location: 'Pakistan' }
  ];

  return (
    <main>
      <h1>Pest & Disease Alert Dashboard</h1>
      <p>Monitor SPS alerts, risks and recommended actions.</p>
      {alerts.map((alert) => (
        <section key={alert.title}>
          <h2>{alert.title}</h2>
          <p>Severity: {alert.level}</p>
          <p>Location: {alert.location}</p>
          <p>Recommended action and regulatory guidance available.</p>
        </section>
      ))}
    </main>
  );
}
