export const demoTenders = [
  {
    id: 'demo-procurement-a',
    title: 'Digital services procurement notice — illustrative record',
    category: 'Technology & Services',
    status: 'Open',
    summary: 'Demonstration record showing structured procurement metadata, filtering and document discovery.',
    documentLabel: 'Demo tender document',
  },
  {
    id: 'demo-procurement-b',
    title: 'General procurement update — illustrative record',
    category: 'General Procurement',
    status: 'Notice',
    summary: 'Demonstration notice used to show how NICL announcements can be consistently tagged and surfaced.',
    documentLabel: 'Demo procurement notice',
  },
  {
    id: 'demo-procurement-c',
    title: 'Supplier information notice — illustrative record',
    category: 'Supplier Information',
    status: 'Open',
    summary: 'Demonstration item showing a supplier-focused public information pathway without claiming a live NICL opportunity.',
    documentLabel: 'Demo supplier document',
  },
] as const;

export const searchCorpus = [
  {
    type: 'Procurement',
    title: 'Procurement & Tender Centre',
    summary: 'Search and filter illustrative procurement records, notices and governed documents.',
    href: '/nicl-demo#procurement',
    keywords: ['tender', 'tenders', 'procurement', 'supplier', 'bid', 'notice'],
  },
  {
    type: 'Publication',
    title: 'Annual Reports & Public Information',
    summary: 'Concept pathway for reports, disclosures and other approved institutional publications.',
    href: '/nicl-demo#public-info',
    keywords: ['annual', 'report', 'reports', 'publication', 'disclosure', 'financial'],
  },
  {
    type: 'Insurance',
    title: 'Marine Insurance Information',
    summary: 'Conceptual guided pathway for marine-related insurance information and supporting documents.',
    href: '/nicl-demo#insurance',
    keywords: ['marine', 'hull', 'cargo', 'insurance', 'product'],
  },
  {
    type: 'Insurance',
    title: 'Travel Insurance Information',
    summary: 'Conceptual guided pathway for travel-related insurance information and customer guidance.',
    href: '/nicl-demo#insurance',
    keywords: ['travel', 'insurance', 'coverage', 'product'],
  },
  {
    type: 'Help',
    title: 'NICL Smart Search',
    summary: 'Source-grounded intelligent assistance over approved demo content.',
    href: '/nicl-demo#ai-assistant',
    keywords: ['help', 'search', 'assistant', 'ai', 'question'],
  },
] as const;

export const assistantKnowledge = {
  tenders: {
    answer:
      'The proposed Procurement & Tender Centre lets users search structured tender records, notices and supporting documents from one place. The records shown in this prototype are demonstration-only and are not live NICL procurement notices.',
    sources: [
      { label: 'Procurement & Tender Centre', href: '/nicl-demo#procurement' },
      { label: 'Demo content notice', href: '/nicl-demo#top' },
    ],
    followUps: ['How would tender filtering work?', 'How is procurement content approved?'],
  },
  annualReport: {
    answer:
      'Annual reports and public disclosures are proposed as a structured, searchable library rather than isolated page links. In production, the content would come from NICL-approved CMS records and published documents.',
    sources: [
      { label: 'Public Information Pulse', href: '/nicl-demo#public-info' },
      { label: 'Search experience', href: '/nicl-demo#top' },
    ],
    followUps: ['How would reports be tagged?', 'Can the assistant cite documents?'],
  },
  marine: {
    answer:
      'The concept groups marine insurance information into a clearer guided pathway so users can discover relevant coverage information and supporting documents more easily. Final product structure and wording remain subject to NICL validation.',
    sources: [
      { label: 'Insurance Discovery', href: '/nicl-demo#insurance' },
      { label: 'Marine Insurance concept card', href: '/nicl-demo#insurance' },
    ],
    followUps: ['Show travel insurance information', 'How is product content governed?'],
  },
  cms: {
    answer:
      'The proposed publishing model separates authoring, review, approval and publishing responsibilities. The demo illustrates role-based permissions, version history, auditability, rollback support and scheduled publishing without requiring a live NICL CMS connection.',
    sources: [
      { label: 'CMS workflow demo', href: '/nicl-demo#procurement' },
      { label: 'Governed publishing bridge', href: '/nicl-demo#accessibility' },
    ],
    followUps: ['How are roles separated?', 'Can publishing be scheduled?'],
  },
  fallback: {
    answer:
      'I cannot provide a grounded answer for that question from the approved demo corpus. In a production implementation, the assistant would return only NICL-approved information or guide the user to an official NICL source instead of inventing an answer.',
    sources: [{ label: 'Demo guardrails', href: '/nicl-demo#ai-assistant' }],
    followUps: ['Show current tenders', 'Find the latest annual report'],
  },
} as const;
