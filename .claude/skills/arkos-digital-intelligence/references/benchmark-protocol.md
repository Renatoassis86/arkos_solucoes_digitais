# ARKOS Global Digital Benchmark Protocol

## Purpose
Build a continuously refreshed evidence base of strong digital experiences without equating company size with design quality.

## Benchmark universe
Maintain sector pools rather than one undifferentiated list. Initial pools:
- Education and EdTech
- B2B/business software and professional services
- Sales, CRM, commerce and revenue technology
- Service businesses and marketplaces
- Cross-sector digital leaders for transferable patterns

Target at least 50 organizations per configured sector when the research infrastructure and legal/operational constraints allow it. Maintain a canonical registry with company, domain, sector, region, business model, benchmark rationale, priority, last scan and last deep capture.

## Daily lightweight scan
For each registered domain, collect only what is necessary for change intelligence:
- availability/status
- homepage title/meta and major navigation labels
- detectable page additions/removals when accessible
- visible campaign/message changes
- observable technology/performance signals where tools permit
- change fingerprint/hash for prioritizing weekly deep review

Do not deep-screenshot every site every day by default. This is expensive, noisy and can create unnecessary load.

## Weekly deep capture
Prioritize changed/high-value sites. For each selected site, inspect a representative page set such as homepage, product/service, pricing, case study/social proof, resources/content, conversion/contact and one key landing page. Capture desktop and mobile views when possible.

## Evaluation dimensions
Score 1–5 only when enough evidence exists and attach notes/evidence:
1. Positioning clarity
2. Value proposition
3. Information architecture
4. Navigation/findability
5. Visual hierarchy
6. Typography
7. Color/system consistency
8. Imagery/illustration/video
9. Interaction/motion
10. Responsive behavior
11. Conversion architecture/CTAs
12. Trust/social proof
13. Content strategy
14. Personalization/localization
15. Accessibility
16. Performance/Core Web Vitals where measurable
17. Technical SEO
18. Structured data/discoverability
19. Privacy/security signals visible from public surface
20. Product-led or self-service mechanics
21. Analytics/experimentation signals when observable
22. Distinctive/reusable patterns

## Evidence model
For every notable finding store:
- URL
- capture timestamp and timezone
- viewport/device
- screenshot path if captured
- observation
- dimension/category
- evidence type: observed / measured / inferred
- confidence
- why it matters
- transferability to ARKOS/client work
- anti-pattern/risk if applicable

## Archive layout
Suggested local/cloud structure:
`benchmarks/YYYY/YYYY-MM-DD/<sector>/<company>/`
with `metadata.json`, `pages.csv` or `pages.jsonl`, `screenshots/`, `notes.md`, and optionally tool-generated reports.

Maintain a separate `patterns/` knowledge base so insights are not trapped inside company folders. Each pattern should record examples, counterexamples, contexts, risks and recommended use.

## Weekly synthesis
Produce:
- what materially changed
- top emerging patterns
- patterns gaining/losing prevalence
- 5–10 transferable ideas
- notable anti-patterns
- implications for ARKOS offers/design system/engineering
- candidates for experiments
- benchmark registry health and failed captures

## Research integrity
Use primary public websites as evidence. Supplement with official engineering/design blogs, documentation and credible research. Never claim causality (e.g. “this design caused growth”) without evidence. Company scale is not proof of UX quality. Avoid copying protected creative expression; extract principles and patterns.
