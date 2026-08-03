# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are shoppers browsing products, adding items to a cart, and completing orders through a browser-based storefront. Secondary users are authenticated staff or administrators who use the admin area for dashboards, POS-style order entry, and operational oversight.

## Product Purpose

This product is a web-based commerce application for presenting products, supporting customer purchasing flows, and giving staff an administrative interface for product and order operations. Success looks like a user being able to discover products, add them to a cart, place an order, and for staff to manage transactions and product-facing workflows from the same system.

## Positioning

The product is a self-contained e-commerce experience with integrated storefront, cart, order history, authentication, and admin/POS workflows rather than a marketplace or an external checkout-only service. Its distinct mechanism is the combination of browsing, cart management, order placement, and staff-side operations in one app.

## Operating Context

The application runs as a Next.js web app and is expected to be used in a modern browser. The current implementation uses Prisma with a PostgreSQL datasource, Better Auth for authentication, and Redis-backed product data access. The product includes customer-facing routes such as product browsing, cart, orders, and profile pages, alongside admin routes for dashboard, settings, and POS.

## Capabilities and Constraints

Confirmed capabilities include:

- product catalog browsing with category and search-driven navigation
- product detail views and purchase controls
- cart creation, item updates, and checkout/order submission
- authenticated user profiles and order history
- admin dashboard and POS-style ordering workflows
- structured persistence through Prisma models for users, sessions, accounts, and orders
- Redis-backed product lookup for performance or caching-oriented access

Open decisions or constraints not codified in the repository include:

- the exact brand voice, marketing positioning, and visual identity system beyond the project name and author attribution
- the business model, pricing strategy, and fulfillment/payment integrations
- any explicit accessibility, localization, or compliance requirements beyond baseline web application expectations

## Brand Commitments

The project name is Codey. The repository README identifies the author as James Leo Ocampo. No formal brand guidelines, logo suite, or approved visual system are present in the codebase.

## Evidence on Hand

Repository evidence includes:

- package metadata in [package.json](package.json) showing a Next.js app with Prisma, Better Auth, Redis, Tailwind, and shadcn UI
- application routes under [src/app](src/app) for products, cart, orders, profile, admin, settings, login, signup, and POS
- Prisma schema in [prisma/schema.prisma](prisma/schema.prisma) for user/auth and transaction-oriented data
- route and component usage that demonstrates cart, order, search, admin, and POS flows in [src/app/components](src/app/components)

The repository does not currently include a dedicated brand asset package, formal product brief, or documented accessibility policy.

## Product Principles

- Keep the shopping and operational experience in one coherent product rather than splitting commerce and admin into unrelated surfaces.
- Support both customer self-service and staff-led operations through shared product and order data.
- Favor authenticated, persistent workflows for carts, orders, and account state.
- Keep the architecture modular and data-driven so future product expansion can fit the existing app structure.

## Accessibility & Inclusion

No product-specific accessibility or inclusion requirements are documented in the repository. Future work should treat keyboard support, visible focus states, and accessible labels as baseline expectations for the browser-based experience.

## UI Components

- Tailwind
- Shadcn

## Color System

read global.css for color pallete

## Anti-Patterns (What NOT to do)

- ❌ Do NOT wrap every section inside borders or cards (avoid "card fatigue")
