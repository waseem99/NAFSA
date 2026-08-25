import Header from '../../components/Header';
import Footer from '../../components/layout/Footer';

export default function LaboratoriesPage() {
  return (
    <main>
      <Header />
      <section className="hero">
        <h1>Laboratory Accreditation Directory</h1>
        <p>Search accredited laboratories, testing capabilities and accreditation information.</p>
      </section>
      <section>
        <h2>Find a Laboratory</h2>
        <div className="grid">
          <div>Province Filter</div>
          <div>Testing Scope</div>
          <div>Product Category</div>
          <div>Accreditation Status</div>
        </div>
      </section>
      <section>
        <h2>Laboratory Profiles</h2>
        <div className="grid">
          <div>Laboratory Name</div>
          <div>Scope of Accreditation</div>
          <div>Validity Information</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
