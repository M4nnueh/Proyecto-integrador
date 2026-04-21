import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // para usar ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  rol: string = 'estudiante'; // valor por defecto

  constructor(private router: Router) {}

  accederDashboard() {
    // Simulación: redirige según el rol
    switch (this.rol) {
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
  }
}
