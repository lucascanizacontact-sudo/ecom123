# Findings

## Research & Discoveries
- [2026-02-10]: Initialized project directory. Workspace is empty.
- [2026-02-10]: Researched Supabase e-commerce starters. Found several templates (Hiyori, Medusa, etc.).
- [2026-02-10]: Confirmed MVP Scope:
    - Integrations: Supabase (Auth, DB, RLS), Vercel.
    - Single Source of Truth: Supabase PostgreSQL.
    - Key roles: Admin (Global management, Order status updates) and Seller (Catalog selection, Manual order entry).
    - Status Flow: pending -> confirmed -> processing -> shipped -> delivered -> cancelled.

## Constraints
- Must follow B.L.A.S.T. protocol and A.N.T. 3-layer architecture.
- **Strictly No Logic for future integrations** (Bankcard, Local Logistics) in MVP.
- **No public storefronts or customer payments.**
- Data must be scoped by `store_id`.
