# NAFSA Technical Architecture Demonstration Layer

## Purpose

This artifact defines how Codistan will visually demonstrate the proposed NAFSA platform architecture during technical evaluation.

The objective is to show a secure, scalable regulatory platform rather than a standalone website.

---

# Logical Architecture

```
Users
  |
  v
Next.js Experience Layer
  |
  v
Application Services (NestJS)
  |
  +----------------+
  |                |
  v                v
Strapi CMS       Regulatory Services
  |                |
  +-------+--------+
          |
          v
PostgreSQL + OpenSearch + Object Storage

Supporting Services:
- Keycloak Identity & MFA
- Redis Cache
- Monitoring
- Security Operations
```

---

# Core Technology Responsibilities

## Next.js

Responsible for:
- public digital experience
- bilingual UI
- RTL support
- accessibility
- SEO and performance

## Strapi CMS

Responsible for:
- structured content management
- maker-checker publishing
- regulatory content workflows
- document publishing

## NestJS

Responsible for:
- application business logic
- future integrations
- regulatory modules
- API layer

## PostgreSQL

Responsible for:
- structured regulatory data
- laboratory information
- application records

## OpenSearch

Responsible for:
- regulatory search
- document discovery
- filtering
- multilingual search capability

## Keycloak

Responsible for:
- authentication
- MFA
- RBAC
- secure employee access

---

# Deployment View

```
Internet Users
      |
      v
WAF / Load Balancer
      |
      v
Container Platform
      |
      +----------------+
      |                |
      v                v
Frontend Pods     Backend Pods

      |
      v
Data Services

PostgreSQL
Redis
OpenSearch
Object Storage
```

---

# Security Demonstration Areas

The technical demonstration should highlight:

- identity and access management
- MFA
- role-based permissions
- audit trails
- secure content workflows
- secure development practices
- monitoring and operational visibility

---

# Demo Narrative

The evaluator journey:

1. Public user discovers SPS information
2. User searches regulatory requirements
3. User accesses market/laboratory information
4. Internal user authenticates securely
5. Content author submits update
6. Reviewer approves content
7. Published information becomes available publicly

---

# Architecture Positioning

NAFSA is positioned as:

**A secure, bilingual, API-ready SPS regulatory knowledge platform supporting stakeholders, regulators and future digital services.**
