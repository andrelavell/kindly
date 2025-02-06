import { auth } from '@/lib/firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return {
    id: user.uid,
    email: user.email,
    name: user.displayName
  };
}

export async function registerWithEmail(email: string, password: string, name: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return {
    id: user.uid,
    email: user.email,
    name: name
  };
}

export async function logout(): Promise<void> {
  await signOut(auth);
}
