# Task Plan: Ecom123 MVP

## Phase 1: Blueprint (Vision & Logic)
- [x] Answer Discovery Questions
- [/] Define JSON Data Schema
- [x] Research GitHub/External resources

## Phase 2: Link (Connectivity)
- [ ] Verify Supabase Connection (Auth/DB/RLS)
- [ ] Verify Vercel Deployment status
- [ ] Build minimal handshake scripts in `tools/`

## Phase 3: Architect (The 3-Layer Build)
- [ ] Layer 1: Architecture (Define Technical SOPs in `architecture/`)
    - [ ] SOP: User Registration & Authentication
    - [ ] SOP: Catalog Management & Product Selection
    - [ ] SOP: Sale Registration & Order Flow
    - [ ] SOP: Admin Dashboard & Order Management
- [ ] Layer 2: Navigation (Decision Making & Tool Orchestration)
- [ ] Layer 3: Tools (Python scripts in `tools/`)
    - [ ] Setup Database Schema via Supabase Migration
    - [ ] Setup Auth Policies

## Phase 4: Stylize (Refinement & UI)
- [ ] Design System (index.css)
- [ ] Auth Components (Login/Register)
- [ ] Seller Dashboard (Catalog, Selection, Orders)
- [ ] Admin Dashboard (Order fulfillment)

## Phase 5: Trigger (Deployment)
- [x] Final Cloud Transfer (Production Sync)
- [x] Documentation: Finalize Maintenance Log in `gemini.md`

## Phase 6: Expansion & Hardening
- [ ] **Admin Product Management:** UI to add, edit, and deactivate products without SQL.
- [ ] **Order Details View:** Modal or page for sellers to see items and full customer data for specific orders.
- [ ] **Data Visualization:** Integration of simple charts for sales performance on the dashboard.
- [ ] **Robust Status Logic:** Implement more detailed logs of when and who changed an order status.
