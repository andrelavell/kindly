import { authService, User } from '../services/auth';
import { auth } from '../utils/firebase';

class AuthStore {
  private static instance: AuthStore;
  private _user: User | null = null;
  private _loading = true;
  private listeners: ((user: User | null) => void)[] = [];

  private constructor() {
    this.init();
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  private async init() {
    try {
      // Force refresh the Firebase user to get latest verification status
      const firebaseUser = auth.currentUser;
      if (firebaseUser) {
        await firebaseUser.reload();
        console.log('Kindly DEBUG: Firebase user after reload:', firebaseUser.emailVerified);
      }

      // Get fresh user data with updated verification status
      const user = await authService.getCurrentUser();
      console.log('Kindly DEBUG: User data after init:', user);
      this._user = user;
    } catch (error) {
      console.error('Error initializing auth store:', error);
    } finally {
      this._loading = false;
      this.notifyListeners();
    }
  }

  get user() {
    return this._user;
  }

  get loading() {
    return this._loading;
  }

  async login(email: string, password: string) {
    this._loading = true;
    this.notifyListeners();
    
    try {
      await authService.login(email, password);
      this._user = await authService.getCurrentUser();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      this._loading = false;
      this.notifyListeners();
    }
  }

  async register(email: string, password: string, name: string) {
    this._loading = true;
    this.notifyListeners();
    
    try {
      const user = await authService.register(email, password, name);
      this._user = user;
      this._loading = false;
      this.notifyListeners();
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      this._loading = false;
      this.notifyListeners();
      throw error;
    }
  }

  async logout() {
    try {
      await authService.logout();
      this._user = null;
      this.notifyListeners();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this._user));
  }
}

export const authStore = AuthStore.getInstance();
