// ตั้งค่าการเชื่อมต่อกับ Supabase
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jhrtznrouoiqocjiysii.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocnR6bnJvdW9pcW9jaml5c2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5OTYyMTMsImV4cCI6MjA4NzU3MjIxM30.adND4EiTJPL52Yc_mEnC7qk0g1wYUMHJcRVdJmSu96o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
