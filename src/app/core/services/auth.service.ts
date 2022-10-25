import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AuthState {
  user: string;
}

export const initialState: AuthState = {
  user: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject<AuthState>(initialState);
  authState$ = this.authState.asObservable();

  constructor() { }

  get state() {
    return this.authState.getValue();
  }

  setUser(user: string): void {
    localStorage.setItem('psUser', user);

    this.authState.next({
      ...this.state,
      user
    });
  }

  clearUser(): void {
    localStorage.removeItem('psUser');

    this.authState.next({
      ...this.state,
      user: ''
    });
  }
}
