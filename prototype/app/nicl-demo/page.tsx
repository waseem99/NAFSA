import type { Metadata } from 'next';
import NICLHome from './NICLHome';

export const metadata: Metadata = {
  title: 'NICL Digital Experience — Interactive Demo | Codistan',
  description:
    'Conceptual interactive demo for a modern, accessible and AI-ready National Insurance Company Limited public website experience.',
  keywords: [
    'NICL',
    'National Insurance Company Limited',
    'insurance',
    'public sector',
    'digital experience',
    'tenders',
    'publications',
    'accessibility',
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'NICL Digital Experience — Interactive Demo',
    description:
      'Conceptual demo showing a modern public-facing NICL experience with governed content, procurement discovery and source-grounded intelligent assistance.',
    type: 'website',
  },
};

export default function NICLDemoPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'National Insurance Company Limited — Conceptual Demo',
    description:
      'Demonstration-only digital experience prepared by Codistan. Content shown here is illustrative and subject to NICL validation.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <NICLHome />
    </>
  );
}
