import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (com service role)
export function createServerClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Upload de imagem para Supabase Storage
 */
export async function uploadPhoto(file: File, reportId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${reportId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('report-photos')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('report-photos')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
