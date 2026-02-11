# SOP: User Registration & Authentication

## Overview
This SOP defines the process for user registration and role-based access control (RBAC).

## Logic
1. User signs up via Supabase Auth.
2. A database trigger on `auth.users` creates a corresponding entry in the `public.profiles` table.
3. The default role for new users is `seller`.
4. Admins must be manually promoted or set via a specific admin registration flow.

## Database Objects
- `profiles` table
- `trigger_on_auth_user_created` function and trigger

## Edge Cases
- **Email already exists:** Supabase Auth handles this.
- **Profile creation fails:** The trigger must be robust. Log failures if possible.
