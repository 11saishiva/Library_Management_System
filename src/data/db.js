import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://sydetliocmilgitkdokk.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZGV0bGlvY21pbGdpdGtkb2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzY3MzEsImV4cCI6MjA1OTYxMjczMX0.BX50_hRh_ZFC-O2JAUsXO2Er5MNdGAW4wI__W_hNBXM'

// export const supabase = createClient(supabaseUrl, supabaseKey)

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://sydetliocmilgitkdokk.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZGV0bGlvY21pbGdpdGtkb2trIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMzY3MzEsImV4cCI6MjA1OTYxMjczMX0.BX50_hRh_ZFC-O2JAUsXO2Er5MNdGAW4wI__W_hNBXM'
// Create and export the supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
