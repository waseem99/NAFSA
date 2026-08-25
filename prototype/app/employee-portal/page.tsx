export default function EmployeePortalPage() {
  const items = [
    'Internal Notices',
    'Office Orders',
    'Memorandums',
    'Training Schedules'
  ];

  return (
    <main>
      <h1>Employee Portal</h1>
      <p>Secure internal information access for NAFSA employees.</p>
      {items.map((item) => (
        <section key={item}>
          <h2>{item}</h2>
          <p>Secure employee content area.</p>
        </section>
      ))}
    </main>
  );
}
