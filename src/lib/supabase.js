import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gleoapdzamhehvxwllca.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZW9hcGR6YW1oZWh2eHdsbGNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0OTM2OTksImV4cCI6MjA4NjA2OTY5OX0.an9aYg1wdIZ3lzaPiV039i27XBR7sulSC8sZgMX8A3U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
