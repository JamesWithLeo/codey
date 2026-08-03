# Visual Design System: Codey

<!-- impeccable:design-schema 1 -->

## Design Philosophy

Codey bridges customer-facing commerce with fast, utility-focused staff tools (POS & Admin).
The aesthetic is clean, fast, and structured — avoiding generic "AI slop" like pure `#000000` blacks, un-tinted grays, or cards nested inside cards.

## Stack & UI Architecture

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + CSS Variables
- **Components:** shadcn UI + Lucide Icons

## Color System

- read global.css for color system
- Use shadcn default color preset

## Typography

- **Body & Data:** `Inter` or System UI
- **POS / Numbers / Prices:** Tabular Monospace font (`font-mono`) for quick scanning of totals and quantities.
- **Constraint:** Never default to raw un-styled browser fallback fonts.

## Surface Guidelines by Audience

1. **Storefront & Cart:** Breathable spacing (`gap-6`, `p-6`), high-contrast buy buttons, clean product grid layouts.
2. **Admin & POS Area:** Compact spatial rhythm (`p-3`, `gap-3`), high density for fast keyboard navigation, distinct badge statuses for pending vs. completed orders.
3. **Shadcn components** always use shadcn over generic elements, pull some components using shadcn registry (located at components.json.)

## Anti-Patterns (What NOT to do)

- ❌ Do NOT wrap every section inside borders or cards (avoid "card fatigue").
- ❌ Do NOT use bounce or elastic animations on buttons.
- ❌ Do NOT use low-contrast text on colored backgrounds.
