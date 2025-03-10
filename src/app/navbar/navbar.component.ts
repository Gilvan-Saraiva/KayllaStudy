import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, LoginResponse } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isRoleVoid(): boolean {
    return this.authService.isRoleVoid();
  }

  isAdmin(): boolean {
    const user: LoginResponse | null = this.authService.getUser();
    return !!user && user.user.role === 'admin';
  }
  isAluno(): boolean {
    const user: LoginResponse | null = this.authService.getUser();
    return !!user && user.user.role === 'aluno';
  }

  redirectToLogin() {
    window.location.href = '/login';
  }

  logout() {
    this.authService.logout();
  }

  getUserName(): string {
    const user = this.authService.getUser();
    return user ? user.user.name : '';
  }
  
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
