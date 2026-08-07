import { createClient } from "@supabase/supabase-js";
import { normalizeSupabaseUrl, pickEnv } from "../env";

const supabaseUrl = normalizeSupabaseUrl(
  pickEnv(import.meta.env.PUBLIC_SUPABASE_URL, import.meta.env.SUPABASE_URL),
);
const publishableKey = pickEnv(
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  import.meta.env.SUPABASE_PUBLISHABLE_KEY,
  import.meta.env.SUPABASE_ANON_KEY,
);
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabasePublicConfig(): boolean {
  return Boolean(supabaseUrl && publishableKey);
}

export function getSupabaseAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) return undefined;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getSupabaseAuthClient() {
  if (!supabaseUrl || !publishableKey) return undefined;

  return createClient(supabaseUrl, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
