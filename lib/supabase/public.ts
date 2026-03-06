import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "./env";

export function createSupabasePublicClient() {
  const { supabaseUrl, supabasePublishableKey } = getSupabasePublicEnv();

  return createClient(supabaseUrl, supabasePublishableKey);
}
