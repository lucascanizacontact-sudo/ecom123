# SOP: Sale Registration & Order Flow

## Overview
Sellers manually register sales generated outside the platform.

## Logic
1. Seller creates an `order` with customer info and delivery location.
2. Order items are added to `order_items`.
3. Initial status is `pending`.
4. Admin reviews the order and updates status (confirmed, processing, etc.).

## Status Transition Rules
- `pending` -> `confirmed` (Admin only)
- `confirmed` -> `processing` (Admin only)
- `processing` -> `shipped` (Admin only)
- `shipped` -> `delivered` (Admin only)
- Any status -> `cancelled` (Admin only)

## Database Objects
- `orders` table
- `order_items` table
