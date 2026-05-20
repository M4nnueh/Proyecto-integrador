import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  rol = 'estudiante';
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrarse(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.nombre || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.nombre, this.email, this.password, this.rol).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = '¡Cuenta creada exitosamente! Redirigiendo al login...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = response.message || 'Error al crear la cuenta.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Ocurrió un error al crear la cuenta.';
      }
    });
  }
}
