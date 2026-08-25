import Header from '../components/Header';
import Footer from '../components/layout/Footer';
import RegulatorySearch from '../components/search/RegulatorySearch';
import QuickAccessCard from '../components/cards/QuickAccessCard';
import RegulatoryCard from '../components/cards/RegulatoryCard';
import StatisticsWidget from '../components/dashboard/StatisticsWidget';

const quickAccess = [
  { title: 'Market Access Intelligence', description: 'Explore SPS requirements, destination markets and export compliance information.' },
  { title: 'Regulatory Repository', description: 'Access regulations, notifications, standards and official publications.' },
  { title: 'Accredited Laboratories', description: 'Search accredited laboratories and available testing capabilities.' },
  { title: 'Pest & Disease Alerts', description: 'View important SPS alerts and recommended actions.' },
];

const updates = [
  'Latest SPS regulatory notifications',
  'Updated market access requirements',
  'New laboratory accreditation information',
];

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero">
        <span className="eyebrow">National Agri-Food Safety Authority</span>
        <h1>Trusted SPS Regulatory Information Platform</h1>
        <p>
          A central digital platform for regulatory information, market access,
          laboratory accreditation and stakeholder services.
        </p>
        <RegulatorySearch />
      </section>

      <section className="section">
        <h2>Quick Access</h2>
        <div className="grid">
          {quickAccess.map((item) => (
            <QuickAccessCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      <section className="section highlight">
        <h2>Regulatory Intelligence</h2>
        <div className="grid">
          {updates.map((item) => (
            <RegulatoryCard key={item} title={item} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>NAFSA Statistics</h2>
        <StatisticsWidget />
      </section>

      <section className="section psw-section">
        <h2>Trade Facilitation Services</h2>
        <p>
          Need transaction processing and trade submission services? Continue to
          Pakistan Single Window.
        </p>
      </section>

      <Footer />
    </main>
  );
}
