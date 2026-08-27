# NICL AI-First Wow Demo — Build Plan

> Branch-isolated planning package. The repository is currently NAFSA-specific; this NICL demo plan intentionally lives on `nicl-wow-demo-plan` so `main` remains untouched until the bid team confirms implementation placement.

## 1. Demo objective

Build the first approved NICL homepage concept into a high-fidelity, client-facing interactive demo that makes the redesign feel real rather than conceptual.

The demo should prove four things in a short evaluator walkthrough:

1. **NICL can look and feel modern without losing institutional credibility.**
2. **Important public information can become dramatically easier to find.**
3. **The website can behave like a governed digital platform, not a static brochure.**
4. **AI, CMS and APIs can be demonstrated safely using realistic mock data without pretending production integrations already exist.**

## 2. Scope guardrails

- This is a **demonstration prototype**, not a production integration.
- No live NICL internal system, customer, policy, claims or personal data.
- Mock data must be visibly realistic but clearly non-production.
- AI answers must be grounded only in the demo knowledge corpus and must show source links/citations.
- No unsupported insurance/legal advice.
- All animation must support `prefers-reduced-motion`.
- Performance and accessibility take priority over decorative effects.

## 3. Homepage direction

Use **Homepage Concept 1 — institutional/corporate trust** as the visual baseline.

### Preserve

- premium institutional hero
- strong NICL identity and public-sector trust
- insurance discovery
- procurement / tenders visibility
- reports / notices / downloads
- modern search
- executive-quality typography and spacing

### Add four new homepage sections

#### A. “How can NICL help you today?” — task-first service journeys

Interactive cards for high-intent journeys such as:

- Explore Insurance
- Find a Tender
- Find a Publication / Report
- Customer Care / Complaints
- Careers
- Contact NICL

**Demo wow:** cursor-responsive cards, icon micro-interactions, hover depth, scroll-reveal, contextual CTA transitions.

#### B. Live Procurement & Disclosure Centre

A real-feeling section backed by mock APIs showing:

- latest tenders
- tender status
- procurement reference
- closing date
- category filters
- latest disclosures / reports / notices

**Demo wow:** animated filtering, skeleton loading, status pills, live-count transitions, quick-view drawer.

#### C. NICL Smart Search / AI Assistant

Homepage-level intelligent search with suggested prompts:

- “Show current tenders”
- “Find the latest annual report”
- “Where can I find marine insurance information?”
- “Show recent NICL notices”

Response pattern:

- short grounded answer
- source cards
- confidence / “based on approved NICL demo content” indicator
- clear escalation to official page/document

**Demo wow:** streaming-style answer animation, citation chips, expandable sources, suggested follow-up prompts.

#### D. Trust, Activity & Public Information Pulse

Animated but defensible demo metrics / indicators using mock data, such as:

- publications available
- open tenders
- insurance categories
- latest updates

Pair with latest-news / notices cards.

**Important:** label mock/demo metrics where a number is not an official NICL figure.

## 4. Full demo homepage sequence

1. Global utility bar + navigation
2. Premium institutional hero
3. Intelligent search entry point
4. Task-first service journeys
5. Insurance solutions / product discovery
6. Procurement & Disclosure Centre
7. Publications / Reports / Compliance
8. NICL Smart Assistant
9. Trust / information pulse + latest updates
10. Corporate / leadership / institutional trust band
11. Contact / customer care CTA
12. Structured footer

## 5. Motion and interaction system

Use motion to reinforce hierarchy and responsiveness, not as decoration.

### Hero

- staggered title/subtitle entrance
- subtle background depth / gradient movement
- slow parallax on supporting visual elements
- CTA hover / focus transitions
- search field focus animation

### Scroll interactions

- section reveal with staggered children
- gentle card elevation / transform
- sticky visual transitions for selected sections
- animated counters triggered once in viewport
- progressive disclosure drawers / accordions

### Micro-interactions

- button press / hover states
- active navigation indicator
- animated filter pills
- skeleton → loaded content transitions
- source citation expand/collapse
- toast after demo actions

### Accessibility

- all motion disabled/reduced under `prefers-reduced-motion`
- keyboard interaction parity
- visible focus states
- no information communicated by motion alone

## 6. Proposed technical implementation

The current prototype is Next.js + React + TypeScript. Retain that baseline and extend it for the demo.

### Frontend

- Next.js App Router
- React + TypeScript
- CSS design tokens / existing style system
- Framer Motion for purposeful motion
- optional lightweight icon library
- no heavy 3D dependency unless performance remains excellent

### Suggested component structure

```text
prototype/
  app/
    page.tsx
    api/
      products/route.ts
      tenders/route.ts
      publications/route.ts
      notices/route.ts
      search/route.ts
      assistant/route.ts
      stats/route.ts
  components/
    nicl/
      hero/
      service-journeys/
      insurance/
      procurement/
      publications/
      smart-search/
      trust-pulse/
      newsroom/
      contact/
    motion/
    demo/
  data/
    nicl/
      products.json
      tenders.json
      publications.json
      notices.json
      knowledge.json
  lib/
    demo-api/
    search/
    assistant/
```

## 7. Mock API system

Use Next.js Route Handlers so the frontend behaves like a real API-backed application while remaining self-contained.

### Endpoints

#### `GET /api/products`

Returns insurance categories/products with:

- id
- title
- slug
- summary
- audience
- featured

#### `GET /api/tenders`

Supports:

- `status`
- `category`
- `q`
- pagination

Returns:

- reference
- title
- category
- publish date
- closing date
- status
- documents

#### `GET /api/publications`

Returns reports, policies, disclosures, annual reports and circular-style demo content.

#### `GET /api/notices`

Returns latest public notices / updates.

#### `GET /api/search?q=`

Federated mock search across products, tenders, publications and notices.

Response should group results by content type and expose matched snippets.

#### `POST /api/assistant`

Input:

```json
{ "query": "Show current tenders" }
```

Output:

```json
{
  "answer": "...",
  "sources": [],
  "suggestions": [],
  "grounded": true
}
```

Implementation should use deterministic retrieval over the local demo corpus. It can simulate streaming in the UI without calling a paid or external LLM.

#### `GET /api/stats`

Returns demo-safe counters used by homepage widgets.

### Mock API realism

- configurable 250–650 ms latency
- skeleton loaders
- error-state toggle for developer testing
- deterministic content so the presentation never produces surprises
- no random answer generation during the client demo

## 8. AI-first development workflow

Use the same delivery story we will present to NICL.

### GPT — planning and analysis

Use for:

- component decomposition
- content modelling
- requirements traceability
- UX copy drafts
- edge cases
- test-case generation
- accessibility/security review prompts

All output remains human-reviewed.

### Cursor — coding assistant

Use for:

- component scaffolding
- TypeScript refactoring
- reusable hooks
- API route implementation
- test generation
- repetitive UI state work

Developer remains responsible for code review and final implementation.

### Playwright — automated interaction testing

Automate the exact presentation path:

1. homepage loads
2. hero/search visible
3. service journey interactions
4. tender filter interaction
5. publication quick view
6. AI assistant prompt and grounded response
7. mobile viewport smoke test

Add screenshot assertions for key demo states.

### Automated deployment pipeline

Pipeline gates:

1. install
2. lint / type-check
3. build
4. Playwright smoke test
5. deploy preview
6. presentation smoke verification

No deployment should become the demo candidate if the scripted presentation route fails.

## 9. Demo control and reliability

Build a presentation-safe demo mode.

### `?demo=1`

When enabled:

- locks deterministic mock data
- disables external dependencies
- preloads key routes/content
- provides seeded AI answers
- suppresses experimental controls

### Optional hidden presenter panel

Keyboard shortcut or small developer-only control can:

- reset demo state
- force API success state
- reset assistant conversation
- toggle mobile preview

Do not expose this in normal evaluator view.

## 10. Key demo scenarios

### Scenario 1 — “I need a tender”

Homepage → Procurement Centre → filter active tenders → quick-view → document links.

### Scenario 2 — “I need an annual report”

Homepage smart search → annual report query → grouped result → publication detail/source.

### Scenario 3 — “I am exploring insurance”

Homepage → service journey → insurance category → clear next action.

### Scenario 4 — “Ask NICL”

Assistant prompt → grounded answer → cited sources → official destination page.

## 11. Definition of wow

The demo is successful if an evaluator can see, in under five minutes:

- a visibly premium homepage
- strong responsiveness and motion
- task-first navigation
- a functioning tender experience
- a functioning intelligent search/assistant experience
- realistic API-backed loading and filtering
- a clear link between UX, CMS governance and future AI capability

## 12. Performance / quality budgets

Target demo budgets:

- no animation that blocks interaction
- no auto-playing heavy video background
- avoid layout shift
- responsive at 1440, 1280, tablet and mobile widths
- all primary flows keyboard-accessible
- Lighthouse-oriented implementation discipline
- graceful fallback if animations are reduced

## 13. Delivery sequence

### Phase 1 — visual foundation

- reproduce Homepage Concept 1 accurately
- establish tokens, typography, spacing, header/footer

### Phase 2 — new homepage sections

- service journeys
- procurement/disclosures
- smart assistant
- trust/information pulse

### Phase 3 — interaction + mock API

- API routes
- loading/filtering/search states
- drawers/modals
- deterministic assistant

### Phase 4 — wow motion

- hero motion
- section reveals
- counters
- micro-interactions
- reduced-motion support

### Phase 5 — hardening

- Playwright scripted demo
- responsive QA
- accessibility QA
- build/deployment pipeline
- offline/local fallback instructions

## 14. Non-negotiable presentation rule

The demo must never require a live external AI API, live NICL API, live database or unstable third-party service to succeed in front of the evaluator.

The experience should **look connected and intelligent while remaining deterministic, safe and presentation-resilient**.
