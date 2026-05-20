import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  isDropdownOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de usuario en tiempo real
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToDashboard() {
    if (this.currentUser) {
      switch (this.currentUser.rol) {
        case 'estudiante':
          this.router.navigate(['/dashboard/estudiante']);
          break;
        case 'profesor':
          this.router.navigate(['/dashboard/profesor']);
          break;
        case 'administrador':
          this.router.navigate(['/dashboard/admin']);
          break;
      }
    }
  }

  logout() {
    this.authService.logout();
    this.isDropdownOpen = false;
    this.router.navigate(['/home']);
  }
}
