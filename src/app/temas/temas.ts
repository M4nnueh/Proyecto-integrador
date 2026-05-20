import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { TemasService } from './temas.service';
import { Tema } from './tema.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-temas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './temas.html',
  styleUrl: './temas.css'
})
export class Temas {
  private temasService = inject(TemasService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Reactividad con Signals
  temas = this.temasService.temas;
  
  // Estado del formulario
  nuevoTitulo = signal('');
  nuevaDescripcion = signal('');
  nuevaBiblioteca = signal('');

  crearTema() {
    if (this.nuevoTitulo().trim() && this.nuevaDescripcion().trim()) {
      this.temasService.crearTema(
        this.nuevoTitulo(), 
        this.nuevaDescripcion(), 
        this.nuevaBiblioteca() || 'No especificada'
      );
      // Reiniciar formulario
      this.nuevoTitulo.set('');
      this.nuevaDescripcion.set('');
      this.nuevaBiblioteca.set('');
    }
  }

  eliminarTema(id: string) {
    this.temasService.eliminarTema(id);
  }

  volver(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      const rolRuta = user.rol === 'administrador' ? 'admin' : user.rol;
      this.router.navigate([`/dashboard/${rolRuta}`]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
