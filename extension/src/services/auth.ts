import { supabase } from '../utils/supabase';

export interface User {
  id: string;
  user_id: string; // 5-digit ID
  email: string;
  name: string;
}

export const auth = {
  // Register with email/password
  async register(email: string, password: string, name: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Generate 5-digit user ID
    const userId = Math.floor(10000 + Math.random() * 90000).toString();

    // Insert into users table
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          user_id: userId,
          email,
          name,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Login with email/password
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Login with Google
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: chrome.runtime.getURL('popup.html'),
      },
    });

    if (error) throw error;
    return data;
  },

  // Login with Apple
  async loginWithApple() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: chrome.runtime.getURL('popup.html'),
      },
    });

    if (error) throw error;
    return data;
  },

  // Login with Facebook
  async loginWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: chrome.runtime.getURL('popup.html'),
      },
    });

    if (error) throw error;
    return data;
  },

  // Get current session
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const session = await this.getSession();
    if (!session) return null;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
