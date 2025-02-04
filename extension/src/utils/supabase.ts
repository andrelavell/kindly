import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jgvtzsatswmqnlwutjch.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpndnR6c2F0c3dtcW5sd3V0amNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NDE5OTMsImV4cCI6MjA1NDIxNzk5M30.7EpstDdyU0WTLDYjd_ukXKkNNuedtLHKnrI0ObsDp80';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
