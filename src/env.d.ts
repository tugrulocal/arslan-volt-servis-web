/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_PUBLISHABLE_KEY?: string;
  readonly SUPABASE_ANON_KEY?: string;
  readonly NEXT_PUBLIC_SUPABASE_URL?: string;
  readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly SUPABASE_SERVICE_ROLE_KEY?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly TURNSTILE_SECRET?: string;
  readonly TURNSTILE_SECRET_KEY?: string;
  readonly REVIEW_HMAC_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  turnstile?: {
    reset: () => void;
  };
}
