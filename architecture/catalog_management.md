# SOP: Catalog Management & Product Selection

## Overview
Sellers access a global catalog and select products they wish to resell.

## Logic
1. **Global Catalog:** Admins populate the `products` table.
2. **Product Visibility:** Products marked as `is_active = true` are visible to all sellers.
3. **Selection:** Sellers "pick" a product, creating a record in `store_products`.
4. **Scoping:** Any query for selected products must be filtered by `store_id`.

## Database Objects
- `products` table
- `store_products` table

## Rules
- Sellers cannot modify products in the global catalog.
- Sellers can only see their own selections in `store_products`.
