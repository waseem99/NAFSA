'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './nicl-demo.module.css';

type SearchResult = {
  type: string;
  title: string;
  summary: string;
  href: string;
};

type Tender = {
  id: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  documentLabel: string;
};

type AssistantResponse = {
  answer: string;
  sources: { label: string; href: string }[];
  followUps: string[];
};

const menu = [
  {
    label: 'About NICL',
    groups: [
      { heading: 'Corporate', links: ['Company Profile', 'Leadership & Governance', 'Vision & Values'] },
      { heading: 'Public Information', links: ['Disclosures', 'Policies', 'Annual Reports'] },
      { heading: 'Connect', links: ['Contact NICL', 'Customer Help', 'Media Centre'] },
    ],
  },
  {
    label: 'Insurance',
    groups: [
      { heading: 'Explore', links: ['Marine Insurance', 'Travel Insurance', 'Property & Engineering'] },
      { heading: 'For Organizations', links: ['Corporate Risk Solutions', 'Public-Sector Coverage', 'Claims Guidance'] },
      { heading: 'Get Help', links: ['Find a Product', 'Coverage Information', 'Contact an Advisor'] },
    ],
  },
  {
    label: 'Procurement',
    groups: [
      { heading: 'Tender Centre', links: ['Active Opportunities', 'Tender Archive', 'Procurement Notices'] },
      { heading: 'Supplier Information', links: ['How to Participate', 'Documents & Forms', 'Clarifications'] },
      { heading: 'Transparency', links: ['Award Information', 'Procurement Policies', 'Public Disclosures'] },
    ],
  },
  {
    label: 'Publications',
    groups: [
      { heading: 'Reports', links: ['Annual Reports', 'Financial Information', 'Corporate Publications'] },
      { heading: 'Updates', links: ['Notices', 'Circulars', 'News & Announcements'] },
      { heading: 'Find', links: ['Document Library', 'Search Publications', 'Media Resources'] },
    ],
  },
  {
    label: 'Careers & Media',
    groups: [
      { heading: 'Careers', links: ['Open Opportunities', 'Working at NICL', 'Recruitment Updates'] },
      { heading: 'Media', links: ['Press Releases', 'Media Gallery', 'Announcements'] },
      { heading: 'Resources', links: ['FAQs', 'Downloads', 'Public Notices'] },
    ],
  },
];

const products = [
  {
    title: 'Marine Insurance',
    copy: 'A clear, structured path to understand marine-related coverage information and supporting documents.',
    image: '/nicl/marine.svg',
  },
  {
    title: 'Travel Insurance',
    copy: 'A simpler way to discover travel coverage information, key considerations and customer guidance.',
    image: '/nicl/travel.svg',
  },
  {
    title: 'Property & Engineering',
    copy: 'Organized information architecture for institutional, property and engineering risk needs.',
    image: '/nicl/property.svg',
  },
];

const journeyCards = [
  ['Explore Insurance', 'Understand available insurance information through guided, plain-language journeys.', '→'],
  ['Find a Tender', 'Search procurement opportunities, notices and related documents from one structured centre.', '→'],
  ['Read Reports', 'Discover annual reports, disclosures, notices and corporate publications without hunting through pages.', '→'],
  ['Get Help', 'Reach the right NICL information or contact path quickly through task-led navigation and intelligent search.', '→'],
];

const defaultPrompt = 'Show current tenders';

export default function NICLHome() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [tenderFilter, setTenderFilter] = useState('All');
  const [assistantPrompt, setAssistantPrompt] = useState(defaultPrompt);
  const [assistant, setAssistant] = useState<AssistantResponse | null>(null);
  const [assistantBusy, setAssistantBusy] = useState(false);
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);

  useEffect(() => {
    fetch('/api/nicl/tenders')
      .then((response) => response.json())
      .then((data) => setTenders(data.items ?? []))
      .catch(() => setTenders([]));

    const nodes = Array.from(document.querySelectorAll('[data-nicl-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMega(null);
        setShowSearch(false);
        setWorkflowOpen(false);
        setTranslateOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visibleTenders = useMemo(() => {
    if (tenderFilter === 'All') return tenders;
    return tenders.filter((item) => item.status === tenderFilter);
  }, [tenders, tenderFilter]);

  async function runSearch(event?: FormEvent) {
    event?.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    setSearching(true);
    setShowSearch(true);
    try {
      const response = await fetch(`/api/nicl/search?q=${encodeURIComponent(q)}`);
      const data = await response.json();
      setSearchResults(data.items ?? []);
    } finally {
      setSearching(false);
    }
  }

  async function askAssistant(prompt = assistantPrompt) {
    const clean = prompt.trim();
    if (!clean) return;
    setAssistantPrompt(clean);
    setAssistantBusy(true);
    setAssistant(null);
    try {
      const response = await fetch('/api/nicl/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: clean }),
      });
      const data = await response.json();
      setAssistant(data);
    } finally {
      setAssistantBusy(false);
    }
  }

  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main-content">Skip to main content</a>

      <div className={styles.demoBar}>
        <div className={styles.container}>
          <span className={styles.demoBadge}>INTERACTIVE CONCEPT DEMO</span>
          <span>Illustrative content only — subject to NICL validation and approval.</span>
          <div className={styles.utilityActions}>
            <button type="button" onClick={() => setTranslateOpen((value) => !value)}>
              اردو / Translate
            </button>
            <a href="#accessibility">Accessibility</a>
          </div>
        </div>
        {translateOpen && (
          <div className={styles.translatePanel} role="status">
            <strong>Translation-ready experience</strong>
            <span>
              The demo uses semantic HTML and language-aware content structure so browser translation tools can be used without a custom translation dependency.
            </span>
          </div>
        )}
      </div>

      <header className={styles.header}>
        <div className={`${styles.container} ${styles.navRow}`}>
          <a className={styles.brand} href="#top" aria-label="NICL concept demo home">
            <span className={styles.brandMark}>NICL</span>
            <span className={styles.brandText}>
              <strong>National Insurance Company Limited</strong>
              <small>Digital Experience Concept</small>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Primary navigation">
            {menu.map((item) => (
              <button
                type="button"
                key={item.label}
                className={activeMega === item.label ? styles.activeNav : ''}
                aria-expanded={activeMega === item.label}
                onClick={() => setActiveMega(activeMega === item.label ? null : item.label)}
              >
                {item.label}<span aria-hidden="true">⌄</span>
              </button>
            ))}
          </nav>

          <button className={styles.searchButton} type="button" onClick={() => setShowSearch(true)}>
            <span aria-hidden="true">⌕</span> Search
          </button>
        </div>

        {activeMega && (
          <div className={styles.megaMenu}>
            <div className={`${styles.container} ${styles.megaInner}`}>
              <div className={styles.megaIntro}>
                <span className={styles.eyebrow}>{activeMega}</span>
                <h2>Find what you need without navigating a maze.</h2>
                <p>Grouped by real user intent, with space to scale as NICL content and services grow.</p>
              </div>
              <div className={styles.megaGroups}>
                {menu
                  .find((item) => item.label === activeMega)
                  ?.groups.map((group) => (
                    <div key={group.heading}>
                      <strong>{group.heading}</strong>
                      {group.links.map((link) => (
                        <a href="#main-content" key={link} onClick={() => setActiveMega(null)}>
                          {link}<span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className={styles.main}>
        <section id="top" className={styles.hero}>
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={`${styles.reveal} ${styles.heroCopy}`} data-nicl-reveal>
              <div className={styles.heroKicker}>
                <span>Proposed Digital Experience</span>
                <span className={styles.liveDot}>Demo mode</span>
              </div>
              <h1>Insurance information that feels clear, credible and easy to act on.</h1>
              <p>
                A modern NICL public experience designed around trust, discoverability, governed publishing and future-ready intelligent assistance.
              </p>

              <form className={styles.heroSearch} onSubmit={runSearch}>
                <label className={styles.srOnly} htmlFor="site-search">Search NICL information</label>
                <span aria-hidden="true">⌕</span>
                <input
                  id="site-search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search tenders, reports, insurance information..."
                />
                <button type="submit">Search</button>
              </form>

              <div className={styles.searchHints}>
                <span>Try:</span>
                {['tenders', 'annual report', 'marine insurance'].map((hint) => (
                  <button key={hint} type="button" onClick={() => { setSearchQuery(hint); setTimeout(() => runSearch(), 0); }}>
                    {hint}
                  </button>
                ))}
              </div>

              <div className={styles.heroActions}>
                <a className={styles.primaryCta} href="#services">Explore services</a>
                <a className={styles.secondaryCta} href="#ai-assistant">Try intelligent search <span>→</span></a>
              </div>
            </div>

            <div className={`${styles.reveal} ${styles.heroVisual}`} data-nicl-reveal>
              <div className={styles.heroImageFrame}>
                <img src="/nicl/hero-building.svg" alt="Conceptual illustration of a modern institutional NICL digital experience" />
                <div className={styles.imageOverlayCard}>
                  <span>Public information, simplified</span>
                  <strong>One governed digital front door</strong>
                </div>
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingOne}`}>
                <span>Procurement</span>
                <strong>Structured tender discovery</strong>
              </div>
              <div className={`${styles.floatingCard} ${styles.floatingTwo}`}>
                <span>CMS</span>
                <strong>Draft → Review → Approve → Publish</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={styles.serviceSection}>
          <div className={styles.container}>
            <div className={`${styles.reveal} ${styles.sectionHeading}`} data-nicl-reveal>
              <span className={styles.eyebrow}>How can NICL help you today?</span>
              <h2>Start with the task, not the organization chart.</h2>
              <p>Four high-frequency journeys surface the most useful public information quickly while keeping the information architecture expandable.</p>
            </div>
            <div className={styles.journeyGrid}>
              {journeyCards.map(([title, copy, arrow], index) => (
                <a
                  className={`${styles.reveal} ${styles.journeyCard}`}
                  data-nicl-reveal
                  style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}
                  href={title === 'Find a Tender' ? '#procurement' : title === 'Read Reports' ? '#public-info' : '#insurance'}
                  key={title}
                >
                  <span className={styles.cardIndex}>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className={styles.cardArrow}>{arrow}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="insurance" className={styles.insuranceSection}>
          <div className={styles.container}>
            <div className={`${styles.sectionHeading} ${styles.headingSplit}`}>
              <div>
                <span className={styles.eyebrow}>Insurance discovery</span>
                <h2>Clear product pathways with room for NICL-approved detail.</h2>
              </div>
              <p className={styles.demoNote}>Illustrative service grouping for demo purposes. Final taxonomy and copy to be validated with NICL.</p>
            </div>
            <div className={styles.productGrid}>
              {products.map((product, index) => (
                <article className={`${styles.reveal} ${styles.productCard}`} data-nicl-reveal key={product.title}>
                  <div className={styles.productImage}>
                    <img src={product.image} alt="" />
                  </div>
                  <div className={styles.productBody}>
                    <span>Insurance information</span>
                    <h3>{product.title}</h3>
                    <p>{product.copy}</p>
                    <button type="button">Explore concept <span>↗</span></button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="procurement" className={styles.procurementSection}>
          <div className={`${styles.container} ${styles.procurementGrid}`}>
            <div className={`${styles.reveal} ${styles.procurementIntro}`} data-nicl-reveal>
              <span className={styles.eyebrow}>Procurement & Disclosure Centre</span>
              <h2>Turn tender pages into a searchable public information service.</h2>
              <p>
                The demo uses a local mock API to show how procurement records can be structured, filtered and linked to governed documents without depending on a live NICL backend.
              </p>
              <div className={styles.apiBadge}><span></span> Mock API connected</div>
              <button type="button" className={styles.secondaryButton} onClick={() => setWorkflowOpen(true)}>
                See how CMS publishing connects →
              </button>
            </div>

            <div className={`${styles.reveal} ${styles.tenderPanel}`} data-nicl-reveal>
              <div className={styles.panelHeader}>
                <div>
                  <span>Interactive demo records</span>
                  <strong>Procurement opportunities</strong>
                </div>
                <div className={styles.filters}>
                  {['All', 'Open', 'Notice'].map((filter) => (
                    <button
                      type="button"
                      className={tenderFilter === filter ? styles.activeFilter : ''}
                      onClick={() => setTenderFilter(filter)}
                      key={filter}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.tenderList}>
                {visibleTenders.length === 0 && <div className={styles.skeleton}>Loading structured procurement data…</div>}
                {visibleTenders.map((tender) => (
                  <article className={styles.tenderItem} key={tender.id}>
                    <div className={styles.tenderMeta}>
                      <span>{tender.category}</span>
                      <span className={styles.statusPill}>{tender.status}</span>
                    </div>
                    <h3>{tender.title}</h3>
                    <p>{tender.summary}</p>
                    <div className={styles.tenderFooter}>
                      <span>{tender.documentLabel}</span>
                      <button type="button">Quick view →</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="ai-assistant" className={styles.aiSection}>
          <div className={`${styles.container} ${styles.aiGrid}`}>
            <div className={`${styles.reveal} ${styles.aiCopy}`} data-nicl-reveal>
              <span className={styles.eyebrow}>NICL Smart Search — Concept</span>
              <h2>Ask in plain language. Get an answer tied to approved sources.</h2>
              <p>
                This demo is deterministic and source-grounded. It does not call a live external LLM, use customer data or make insurance/legal decisions.
              </p>
              <div className={styles.guardrails}>
                <span>✓ Approved demo corpus only</span>
                <span>✓ Source cards visible</span>
                <span>✓ Safe fallback for unsupported questions</span>
                <span>✓ Provider-agnostic production architecture</span>
              </div>
            </div>

            <div className={`${styles.reveal} ${styles.assistantCard}`} data-nicl-reveal>
              <div className={styles.assistantHeader}>
                <div className={styles.aiOrb}>AI</div>
                <div><strong>NICL Assistant</strong><span>Grounded demo mode</span></div>
                <span className={styles.securePill}>Source-backed</span>
              </div>
              <div className={styles.promptChips}>
                {['Show current tenders', 'Find the latest annual report', 'Where is marine insurance information?'].map((prompt) => (
                  <button key={prompt} type="button" onClick={() => askAssistant(prompt)}>{prompt}</button>
                ))}
              </div>
              <div className={styles.answerArea}>
                {assistantBusy && (
                  <div className={styles.typingState}><span></span><span></span><span></span> Searching approved demo content…</div>
                )}
                {!assistantBusy && !assistant && (
                  <div className={styles.emptyAssistant}>
                    <strong>Try a suggested question</strong>
                    <span>The assistant will return a concise answer with source links.</span>
                  </div>
                )}
                {assistant && (
                  <div className={styles.answerContent}>
                    <p>{assistant.answer}</p>
                    <div className={styles.sourceRow}>
                      {assistant.sources.map((source) => (
                        <a href={source.href} key={source.label}>{source.label} ↗</a>
                      ))}
                    </div>
                    <div className={styles.followUps}>
                      <span>Suggested follow-up</span>
                      {assistant.followUps.map((followUp) => (
                        <button type="button" key={followUp} onClick={() => askAssistant(followUp)}>{followUp}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <form
                className={styles.assistantInput}
                onSubmit={(event) => {
                  event.preventDefault();
                  askAssistant();
                }}
              >
                <input value={assistantPrompt} onChange={(event) => setAssistantPrompt(event.target.value)} aria-label="Ask NICL assistant" />
                <button type="submit">Ask →</button>
              </form>
            </div>
          </div>
        </section>

        <section id="public-info" className={styles.publicInfoSection}>
          <div className={styles.container}>
            <div className={`${styles.reveal} ${styles.sectionHeading}`} data-nicl-reveal>
              <span className={styles.eyebrow}>Trust & Public Information Pulse</span>
              <h2>Important institutional information should never feel buried.</h2>
              <p>Instead of invented statistics, the demo highlights content categories, status and recency patterns that NICL can populate from approved CMS records.</p>
            </div>
            <div className={styles.pulseGrid}>
              {[
                ['Annual Reports', 'Structured library', 'Reports and disclosures organized for direct retrieval.'],
                ['Procurement', 'Searchable centre', 'Tender records and notices surfaced with consistent metadata.'],
                ['Corporate Governance', 'Clear pathways', 'Leadership, policies and public information grouped predictably.'],
                ['Customer Help', 'Task-led access', 'Help information designed around what people are trying to accomplish.'],
              ].map(([title, status, copy], index) => (
                <article className={`${styles.reveal} ${styles.pulseCard}`} data-nicl-reveal key={title}>
                  <span className={styles.pulseIcon}>{['◫', '⌕', '◇', '◎'][index]}</span>
                  <span className={styles.pulseStatus}>{status}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <a href="#top">View concept pathway →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cmsBridge}>
          <div className={`${styles.container} ${styles.cmsBridgeInner}`}>
            <div>
              <span className={styles.eyebrow}>Governed publishing behind the experience</span>
              <h2>Beautiful public UX only works when content governance is equally strong.</h2>
            </div>
            <button type="button" onClick={() => setWorkflowOpen(true)}>Open CMS workflow demo <span>→</span></button>
          </div>
        </section>

        <section id="accessibility" className={styles.accessibilitySection}>
          <div className={`${styles.container} ${styles.accessibilityGrid}`}>
            <div>
              <span className={styles.eyebrow}>Public-facing quality baseline</span>
              <h2>Designed for search engines, assistive technology and real-world devices.</h2>
            </div>
            <div className={styles.qualityList}>
              <span>Semantic HTML & landmark structure</span>
              <span>Keyboard-first interaction states</span>
              <span>Visible focus & reduced-motion support</span>
              <span>Descriptive metadata & social previews</span>
              <span>Schema.org structured data</span>
              <span>Search-friendly information architecture</span>
              <span>Responsive images & performance-minded layout</span>
              <span>Language-aware / browser-translation-ready markup</span>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <span className={styles.brandMark}>NICL</span>
            <h2>National Insurance Company Limited</h2>
            <p>Conceptual digital experience prepared for evaluation. Final content, services, legal wording and information architecture remain subject to NICL validation.</p>
            <span className={styles.demoBadge}>DEMO — NOT A LIVE NICL WEBSITE</span>
          </div>
          <div>
            <strong>Insurance</strong>
            <a href="#insurance">Explore insurance</a>
            <a href="#insurance">Marine information</a>
            <a href="#insurance">Travel information</a>
          </div>
          <div>
            <strong>Public Information</strong>
            <a href="#procurement">Procurement</a>
            <a href="#public-info">Reports & disclosures</a>
            <a href="#public-info">Notices & updates</a>
          </div>
          <div>
            <strong>Help & Access</strong>
            <a href="#ai-assistant">Intelligent search</a>
            <a href="#accessibility">Accessibility</a>
            <button type="button" onClick={() => setTranslateOpen(true)}>Language / Translate</button>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.container}>
            <span>Concept by Codistan · Interactive presentation build</span>
            <span>Privacy-ready · Accessible · Search-friendly · CMS-governed</span>
          </div>
        </div>
      </footer>

      {showSearch && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setShowSearch(false)}>
          <div className={styles.searchModal} role="dialog" aria-modal="true" aria-label="Search NICL demo" onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div><span>Search demo</span><strong>Find NICL information</strong></div>
              <button type="button" onClick={() => setShowSearch(false)} aria-label="Close search">×</button>
            </div>
            <form className={styles.modalSearch} onSubmit={runSearch}>
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search tenders, reports, insurance information..." />
              <button type="submit">Search</button>
            </form>
            <div className={styles.searchResults}>
              {searching && <div className={styles.skeleton}>Searching mock API…</div>}
              {!searching && searchResults.length === 0 && <p>Enter a search term to explore the demo content model.</p>}
              {searchResults.map((result) => (
                <a href={result.href} key={`${result.type}-${result.title}`} onClick={() => setShowSearch(false)}>
                  <span>{result.type}</span>
                  <strong>{result.title}</strong>
                  <p>{result.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {workflowOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setWorkflowOpen(false)}>
          <aside className={styles.workflowDrawer} role="dialog" aria-modal="true" aria-label="CMS workflow demonstration" onMouseDown={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div><span>CMS workflow demonstration</span><strong>Governed publishing</strong></div>
              <button type="button" onClick={() => setWorkflowOpen(false)} aria-label="Close workflow">×</button>
            </div>
            <p className={styles.drawerIntro}>Illustrative workflow showing how NICL content can move through controlled roles before public publishing.</p>
            <div className={styles.workflowSteps}>
              {[
                ['Content Author', 'Draft', 'Creates structured content and attaches governed documents.'],
                ['Section Reviewer', 'In Review', 'Checks completeness, accuracy and presentation.'],
                ['Authorized Approver', 'Approved', 'Confirms publication readiness and governance requirements.'],
                ['Publishing', 'Scheduled / Live', 'Publishes immediately or at an approved scheduled time.'],
              ].map(([role, state, copy], index) => (
                <div className={styles.workflowStep} key={role}>
                  <span>{index + 1}</span>
                  <div><small>{state}</small><strong>{role}</strong><p>{copy}</p></div>
                </div>
              ))}
            </div>
            <div className={styles.workflowFeatures}>
              <span>Role-based permissions</span>
              <span>Version history</span>
              <span>Audit trail</span>
              <span>Rollback support</span>
              <span>Media governance</span>
              <span>Scheduled publishing</span>
            </div>
            <div className={styles.drawerNote}>Demo workflow only — no live NICL CMS connection is required for this presentation.</div>
          </aside>
        </div>
      )}
    </div>
  );
}
