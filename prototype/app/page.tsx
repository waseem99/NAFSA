import Header from '../components/Header';
import Footer from '../components/layout/Footer';
import RegulatorySearch from '../components/search/RegulatorySearch';
import QuickAccessCard from '../components/cards/QuickAccessCard';
import RegulatoryCard from '../components/cards/RegulatoryCard';
import StatisticsWidget from '../components/dashboard/StatisticsWidget';

const quickAccess = [
  'Market Access',
  'Regulatory Repository',
  'Accredited Laboratories',
  'Pest & Disease Alerts'
];

const updates = [
  'Latest SPS regulatory notifications',
  'Updated market access requirements',
  'New laboratory accreditation information'
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero">
        <h1>National SPS Regulatory Information Platform</h1>
        <p>
          Trusted regulatory information for safe trade, compliance and stakeholder access.
        </p>
        <RegulatorySearch />
      </section>

      <section>
        <h2>Quick Access</h2>
        <div className="grid">
          {quickAccess.map((item) => (
            <QuickAccessCard key={item} title={item} />
          ))}
        </div>
      </section>

      <section>
        <h2>Regulatory Intelligence</h2>
        <div className="grid">
          {updates.map((item) => (
            <RegulatoryCard key={item} title={item} />
          ))}
        </div>
      </section>

      <section>
        <h2>NAFSA Statistics</h2>
        <StatisticsWidget />
      </section>

      <section>
        <h2>Trade Facilitation</h2>
        <p>
          Need transaction services? Visit Pakistan Single Window for trade processing.
        </p>
      </section>

      <Footer />
    </main>
  );
}
