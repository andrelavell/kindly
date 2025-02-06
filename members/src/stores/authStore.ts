import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from '@/services/auth';
import { loginWithEmail, registerWithEmail, logout as authLogout } from '@/services/auth';

type Subscriber = (user: User | null) => void;

class AuthStore {
  private subscribers: Set<Subscriber> = new Set();
  private currentUser: User | null = null;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName
        };
      } else {
        this.currentUser = null;
      }
      this.notifySubscribers();
    });
  }

  async login(email: string, password: string): Promise<void> {
    await loginWithEmail(email, password);
  }

  async register(email: string, password: string, name: string): Promise<void> {
    await registerWithEmail(email, password, name);
  }

  async logout(): Promise<void> {
    await authLogout();
  }

  subscribe(callback: Subscriber): () => void {
    this.subscribers.add(callback);
    callback(this.currentUser);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach(callback => callback(this.currentUser));
  }
}

export const authStore = new AuthStore();
