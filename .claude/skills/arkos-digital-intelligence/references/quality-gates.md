# ARKOS Quality Gates

Before recommending launch or production readiness, review as applicable:

## Business/Product
- measurable objective and owner
- validated scope and acceptance criteria
- analytics/event plan
- content ownership and operating model

## UX/UI
- responsive states
- keyboard/focus behavior
- contrast and semantics
- empty/error/loading states
- form validation and recovery
- design-system consistency

## Engineering
- architecture rationale and ADRs for consequential choices
- automated tests appropriate to risk
- code review/static analysis
- dependency and secret management
- backups/recovery where stateful
- migration/rollback plan

## Security/Privacy
- least privilege
- authentication/session controls
- authorization testing
- input validation
- encryption in transit/at rest as applicable
- privacy/consent/data-retention requirements
- logging without sensitive leakage

## Reliability/Operations
- observability
- error tracking
- uptime/health checks
- incident ownership
- SLO/SLA when contracted
- capacity/cost expectations

## Web Quality
- accessibility review
- performance/Core Web Vitals
- technical SEO/indexation
- metadata/social sharing
- structured data where relevant
- redirects/canonicals/sitemaps
- cross-browser/device testing
