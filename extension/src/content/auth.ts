import { supabase } from '../utils/supabase';

export async function isLoggedIn(): Promise<boolean> {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Kindly: Error checking auth state:', error);
    return false;
  }
  return !!session;
}
