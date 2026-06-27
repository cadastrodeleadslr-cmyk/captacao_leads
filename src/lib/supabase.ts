import { createClient } from "@supabase/supabase-js";

// This client can be used in both frontend and backend (if required)
// It uses environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for client-side
// or process.env equivalents if used on the server.
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Expected schema for Supabase table `leads_vault`:
 * 
 * create table leads_vault (
 *   id text primary key,
 *   category text not null, -- leads_proprios, oportunidades_publicas, monitoramento_mercado, clientes_confirmados
 *   title text not null,
 *   summary text,
 *   excerpt text,
 *   url text,
 *   date text,
 *   time text,
 *   source_type text,
 *   confidence integer,
 *   confidence_reason text,
 *   status text,
 *   region text,
 *   property_type text,
 *   contact_name text,
 *   contact_phone text,
 *   contact_email text,
 *   urgency text,
 *   intent_score integer,
 *   intent_details text,
 *   history jsonb,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null,
 *   updated_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 */
