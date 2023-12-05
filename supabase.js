// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kvierftailjjrsfbrpfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aWVyZnRhaWxqanJzZmJycGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMzY3MTAsImV4cCI6MjAxNjkxMjcxMH0.ZRdAKpV8FeakpQAPP-RMjFHf3KDFUsAafXElNDek2pY'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
