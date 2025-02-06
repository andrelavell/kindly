import { authService, User } from '../services/auth';

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
      const user = await authService.getCurrentUser();
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
    try {
      const user = await authService.register(email, password, name);
      this._user = user;
      this.notifyListeners();
    } catch (error) {
      console.error('Registration error:', error);
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
