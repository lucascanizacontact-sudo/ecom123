# Ecom123 - Seller Platform (MVP)

A stable platform for sellers to register, access a curated catalog of products for resale, and track their activity through a dashboard, without managing inventory or logistics.

## Features
- **Seller Dashboard:** Real-time stats and manual sale registration.
- **Product Catalog:** Curated global catalog for selection.
- **Admin Portal:** Order management and status updates (pending, confirmed, processing, shipped, delivered, cancelled).
- **Security:** Supabase Auth and Row-Level Security (RLS) for data isolation.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Supabase (Auth & PostgreSQL)
- **Styling:** Custom Design System (CSS)

## Getting Started

### Prerequisites
- Node.js installed
- Supabase Project

### Local Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture
This project follows a 3-layer architecture:
1. **Architecture:** Technical SOPs in `architecture/`.
2. **Navigation:** Decision-making and routing.
3. **Tools:** Deterministic Python/Node scripts.
