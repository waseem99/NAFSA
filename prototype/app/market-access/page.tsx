import Header from '../../components/Header';
import Footer from '../../components/layout/Footer';

export default function MarketAccessPage() {
  return (
    <main>
      <Header />
      <section className="hero">
        <h1>Market Access Intelligence</h1>
        <p>Discover SPS requirements, documentation and regulatory information by commodity and destination market.</p>
      </section>
      <section>
        <h2>Find Export Requirements</h2>
        <div className="grid">
          <div>Commodity: Mango</div>
          <div>Destination: UAE</div>
          <div>HS Code: 080450</div>
        </div>
      </section>
      <section>
        <h2>Requirements</h2>
        <div className="grid">
          <div>SPS Measures</div>
          <div>Documentation</div>
          <div>Laboratory Requirements</div>
          <div>Applicable Regulations</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
