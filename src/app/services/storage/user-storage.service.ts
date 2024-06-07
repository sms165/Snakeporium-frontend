import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  public saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  public saveUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      return window.localStorage.getItem(TOKEN);
    }
    return null;
  }

  static getUser(): any {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      const user = window.localStorage.getItem(USER);
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (!this.getToken()) {
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void {
    if (typeof window !== 'undefined' && !!window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
