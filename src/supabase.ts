import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
// const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const getPosts = async () =>
  await supabase.storage.from('photos').list('', {
    limit: 100,
    offset: 0,
    //   sortBy: { column: 'name', order: 'asc' },
    //
  });

export const uploadImages = async (id: string, array) => {
  return array.map(async (photo) => {
    const fileId = crypto.randomUUID();
    await supabase.storage.from('photos').upload(`${id}/${fileId}.png`, photo, {
      cacheControl: '3600',
      upsert: false,
    });
  });
};
