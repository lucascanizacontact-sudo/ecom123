# Project Constitution: Ecom123 MVP

## Core Mission
Stable platform for sellers to register, access a curated catalog for resale, and track activity via dashboard. No inventory management or logistics for sellers.

## Data Schemas

### Table: profiles
- `id`: uuid (Primary Key, matches auth.users)
- `email`: string
- `role`: enum ('admin', 'seller')
- `created_at`: timestamp

### Table: stores
- `id`: uuid (Primary Key)
- `owner_id`: uuid (FK to profiles.id)
- `name`: string
- `created_at`: timestamp

### Table: products (Global Catalog)
- `id`: uuid (Primary Key)
- `name`: string
- `description`: text
- `base_price`: decimal
- `image_url`: string
- `is_active`: boolean
- `created_at`: timestamp

### Table: store_products (Seller Selections)
- `id`: uuid (Primary Key)
- `store_id`: uuid (FK to stores.id)
- `product_id`: uuid (FK to products.id)
- `created_at`: timestamp

### Table: orders (Sellers register sales)
- `id`: uuid (Primary Key)
- `store_id`: uuid (FK to stores.id)
- `status`: enum ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')
- `customer_info`: jsonb (name, email, phone, location)
- `total_amount`: decimal
- `created_at`: timestamp
- `updated_at`: timestamp

### Table: order_items
- `id`: uuid (Primary Key)
- `order_id`: uuid (FK to orders.id)
- `product_id`: uuid (FK to products.id)
- `quantity`: integer
- `unit_price`: decimal

## Behavioral Rules
1. **Reliability over speed.**
2. **Never guess business logic.**
3. **Deterministic Logic:** Business logic must be predictable and documented.
4. **Data Ownership:** All operational data must be scoped by `store_id`. Sellers only access their own data.
5. **Role-Based Access:** 
    - Sellers: Create orders (pending status). View status updates.
    - Admins: Change order status. Global management.
6. **No Duplicated Logic:** Frontend never stores authoritative data. Logic stays in backend/DB.

## DO NOT Rules
1. **No Public Storefronts:** No customer-facing site for sales.
2. **No Payments:** No implementation of checkout, subscription, or customer payments in MVP.
3. **No Logistics Automation:** No shipment tracking or creation logic yet.
4. **No Customization:** Do not build advanced customization systems.
5. **No Undefined Logic:** Do not assume logic not explicitly stated.

## Architectural Invariants
- Layer 1: Architecture (SOPs in `architecture/`)
- Layer 2: Navigation (Decision Making & Tool Orchestration)
- Layer 3: Tools (Python scripts in `tools/`)
- All intermediate files in `.tmp/`

## Maintenance Log
- 2026-02-10: Constitution updated with MVP requirements and Data Schema.
- 2026-02-10: Phase 4 & 5 completed. Full SaaS frontend implemented with Auth, Catalog, and Orders. Web app build verified.
