import Header from '../../components/Header';
import Footer from '../../components/layout/Footer';

export default function RegulationsPage() {
  return (
    <main>
      <Header />
      <section className="hero">
        <h1>Regulatory Repository</h1>
        <p>Centralized access to SPS regulations, notifications, standards and guidance documents.</p>
      </section>
      <section>
        <h2>Search and Filter</h2>
        <div className="grid">
          <div>Document Type</div>
          <div>Regulatory Area</div>
          <div>Date Published</div>
          <div>Keyword Search</div>
        </div>
      </section>
      <section>
        <h2>Latest Regulatory Information</h2>
        <div className="grid">
          <div>SPS Notification</div>
          <div>Export Guideline</div>
          <div>Food Safety Standard</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
