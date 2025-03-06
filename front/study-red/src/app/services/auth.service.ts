import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environments.prod';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const userData = this.isBrowser() ? localStorage.getItem('user') : null;
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
      userData ? JSON.parse(userData) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (this.isBrowser()) {
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('token', response.token);
          }
          this.currentUserSubject.next(response);
        })
      );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const user = this.getUser();
    return !!user && !!user.token;
  }

  getToken(): string {
    return this.isBrowser() ? localStorage.getItem('token') || '' : '';
  }
}
