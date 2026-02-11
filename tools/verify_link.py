import os
import json
import urllib.request
import urllib.error

def verify_link():
    # Attempt to read .env manually if not using dotenv
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
        print("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env")
        return
    
    # Test API connection using urllib - query the profiles table
    req_url = f"{url}/rest/v1/profiles?select=*"
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}"
    }
    
    try:
        req = urllib.request.Request(req_url, headers=headers)
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                print("✅ Supabase Connection: SUCCESS")
            else:
                print(f"❌ Supabase Connection: FAILED (Status: {response.status})")
    except urllib.error.HTTPError as e:
        print(f"❌ Supabase Connection: FAILED (HTTP Error: {e.code})")
        print(e.read().decode())
    except Exception as e:
        print(f"❌ Supabase Connection: ERROR ({str(e)})")

if __name__ == "__main__":
    verify_link()
