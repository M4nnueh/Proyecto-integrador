import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // para usar ngModel
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  accederDashboard() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, introduce tu correo y contraseña.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.user) {
          // Redirigir según el rol del usuario retornado por la base de datos
          switch (response.user.rol) {
            case 'estudiante':
              this.router.navigate(['/dashboard/estudiante']);
              break;
            case 'profesor':
              this.router.navigate(['/dashboard/profesor']);
              break;
            case 'administrador':
              this.router.navigate(['/dashboard/admin']);
              break;
            default:
              this.router.navigate(['/home']);
          }
        } else {
          this.errorMessage = response.message || 'Error al iniciar sesión.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error de login:', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifica que el backend esté activo.';
        }
      }
    });
  }
}
