import os
import json
import urllib.request
from dotenv import load_dotenv

def seed_products():
    # Load env manually
    env_vars = {}
    try:
        with open(".env", "r") as f:
            for line in f:
                if "=" in line:
                    key, value = line.strip().split("=", 1)
                    env_vars[key] = value
    except FileNotFoundError:
        print("❌ .env file not found")
        return

    url = env_vars.get("SUPABASE_URL")
    key = env_vars.get("SUPABASE_ANON_KEY")
    
    if not url or not key:
        print("❌ Missing credentials")
        return

    products = [
        {"name": "Wireless Headphones", "description": "Noise-cancelling over-ear headphones.", "base_price": 99.99, "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"},
        {"name": "Smart Watch", "description": "Fitness tracking and notifications.", "base_price": 149.50, "image_url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"},
        {"name": "Portable Power Bank", "description": "20000mAh high-capacity charger.", "base_price": 35.00, "image_url": "https://images.unsplash.com/photo-1609592424109-dd03240e908f?w=500"}
    ]

    # Note: Insertion via REST API requires specific permissions (Admin or bypassing RLS)
    # Since we are using an anon key and products table is protected for manage, 
    # we might need to use a service role key or execute via SQL.
    # For simplicity and protocol adherence, I'll execute via SQL tool.
    print("⚠️ Seeding via REST API might fail due to RLS. Using SQL tool instead.")

if __name__ == "__main__":
    seed_products()
