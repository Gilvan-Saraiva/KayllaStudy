import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}


  isAdmin(): boolean {
    const user = this.authService.getUser();
    return user && user.role === 'admin';
  }
  redirectToLogin() {
    window.location.href = '/login';
  }
}
