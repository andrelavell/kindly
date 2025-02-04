import { supabase } from './supabase';

// Generate a random 5-digit number
function generateUserId(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

// Check if user ID exists and generate a new one if it does
export async function getUniqueUserId(): Promise<string> {
  let userId = generateUserId();
  let exists = true;
  
  while (exists) {
    const { data } = await supabase
      .from('users')
      .select('user_id')
      .eq('user_id', userId)
      .single();
    
    exists = !!data;
    if (exists) {
      userId = generateUserId();
    }
  }
  
  return userId;
}
