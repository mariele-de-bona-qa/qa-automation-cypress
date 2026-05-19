# SpaceX Quality Engineering Lab

Quality Engineering project focused on API Testing, Observability, Accessibility and Reliability Engineering using Cypress and public SpaceX APIs.

This repository was designed to simulate a more realistic Quality Engineering approach, going beyond traditional UI automation and validating operational aspects such as:

- API reliability
- response time
- schema validation
- accessibility
- resilience
- payload integrity
- media validation
- network monitoring

---

# Project Goal

Most automation projects focus only on:

- login
- forms
- CRUD
- UI validation

This project was built with a different mindset:

> Treat automated testing as an engineering discipline focused on system quality, reliability and observability.

---

# Architecture Approach

The test architecture was organized by business and technical capabilities inspired by Quality Engineering and TOGAF concepts.

```txt
cypress/e2e/
├── launches/
├── media/
├── api/
├── reliability/
├── accessibility/
└── observability/
```

---

# Tech Stack

- Cypress
- JavaScript
- axe-core
- cypress-axe
- Mochawesome
- Node.js

---

# Project Structure

```txt
cypress/
├── e2e/
│
│   ├── launches/
│   │   ├── upcoming-launches.cy.js
│   │   ├── past-launches.cy.js
│   │   └── launch-details.cy.js
│
│   ├── media/
│   │   ├── images-validation.cy.js
│   │   ├── video-links.cy.js
│   │   └── external-links.cy.js
│
│   ├── api/
│   │   ├── launches-api.cy.js
│   │   ├── rockets-api.cy.js
│   │   └── schema-validation.cy.js
│
│   ├── reliability/
│   │   ├── api-failure.cy.js
│   │   ├── timeout.cy.js
│   │   └── retry-strategy.cy.js
│
│   ├── accessibility/
│   │   └── a11y.cy.js
│
│   └── observability/
│       └── network-monitoring.cy.js
│
├── reports/
├── screenshots/
├── videos/
└── support/
```

---

# Test Coverage

## API Testing

- status code validation
- payload validation
- schema validation
- contract validation
- response structure validation

---

## Observability

- response time monitoring
- API availability
- payload integrity
- HTTP headers validation
- network stability analysis

---

## Reliability Engineering

- retry strategy
- timeout validation
- resilience scenarios
- API failure handling
- multiple request stability

---

## Accessibility Testing (A11Y)

Accessibility validations using:

- Cypress
- cypress-axe
- axe-core

Validated scenarios:

- HTML semantics
- accessibility violations
- assistive technology support
- WCAG-related issues
- frontend accessibility risks

---

## Media Validation

- broken image validation
- external links validation
- webcast validation
- media payload consistency

---

# Reports

The project generates consolidated HTML reports using Mochawesome.

Generated reports include:

- execution evidence
- screenshots
- test results
- execution timing
- detailed logs

---

# Running The Project

## Install dependencies

```bash
npm install
```

---

## Run all tests

```bash
npx cypress run
```

---

## Run a specific suite

```bash
npx cypress run --spec "cypress/e2e/api/*.cy.js"
```

---

## Open Cypress UI

```bash
npx cypress open
```

---

# Generate Consolidated HTML Report

```bash
npx mochawesome-merge "cypress/reports/*.json" > mochawesome.json
npx marge mochawesome.json --reportDir cypress/final-report --reportFilename index --inline
```

Generated report:

```txt
cypress/final-report/index.html
```

---

# Why Cypress Instead of Postman?

This project was not designed only for endpoint validation.

The goal was to integrate:

- observability
- reliability
- resilience
- accessibility
- automation
- operational quality

Cypress enabled:

- API testing
- accessibility testing
- execution monitoring
- retry validation
- integrated reporting
- CI/CD integration
- consolidated execution flows

---

# Public APIs Used

- SpaceX API v5
- SpaceX API v4 Rockets Endpoint

---

# Quality Engineering Vision

This project reflects a broader QA mindset:

> Modern QA is not only about validating functionality.

It is also about validating:

- reliability
- stability
- accessibility
- operational behavior
- user experience
- system quality

---

# Author

Mariele De Bona  
QA Engineer | Quality Engineering | Automation | APIs | Reliability | Accessibility
