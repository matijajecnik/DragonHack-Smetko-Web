import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://cdlxbuuyqdoflnyupvem.supabase.co/', process.env.NEXT_PUBLIC_SUPABASE_KEY || "")

export default supabase;