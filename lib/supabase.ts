import { createClient } from '@supabase/supabase-js'

// Singleton browser client. For server-side operations, prefer using service role on API routes only.
// Be careful not to expose the service role key on the client.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '', {
  auth: {
    // persistSession is fine for Next.js App Router + client components
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Server-only client factory (use from server actions or route handlers with care)
export const createServerSupabase = (opts?: { serviceKey?: string }) => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const key = opts?.serviceKey ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  if (!url || !key) {
    // eslint-disable-next-line no-console
    console.warn('[supabase] Missing URL or SERVICE ROLE KEY for server client')
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
