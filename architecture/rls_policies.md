# SOP: Row-Level Security (RLS) Policies

## Profiles
- **SELECT**: `auth.uid() = id` (Users see themselves) or `role = 'admin'` (Admins see all).
- **UPDATE**: `auth.uid() = id`.

## Stores
- **SELECT**: `auth.uid() = owner_id` or `role = 'admin'`.
- **INSERT**: `auth.uid() = owner_id`.
- **UPDATE**: `auth.uid() = owner_id`.

## Products
- **SELECT**: Any authenticated user.
- **INSERT/UPDATE/DELETE**: `role = 'admin'` only.

## Store Products
- **SELECT/INSERT/DELETE**: `store_id in (select id from stores where owner_id = auth.uid())`.

## Orders
- **SELECT**: `store_id in (select id from stores where owner_id = auth.uid())` or `role = 'admin'`.
- **INSERT**: `store_id in (select id from stores where owner_id = auth.uid())`.
- **UPDATE**: `role = 'admin'` only (for status changes).

## Order Items
- **SELECT**: Associated order belongs to user's store or user is admin.
- **INSERT**: Associated order belongs to user's store.
