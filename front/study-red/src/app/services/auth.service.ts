import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}
  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return {}; // Retorna um objeto vazio no servidor para evitar erros
  }
  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
