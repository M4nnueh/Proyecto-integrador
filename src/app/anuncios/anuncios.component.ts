import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { AnunciosService, Anuncio } from '../services/anuncios.service';
import { AuthService, User } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-anuncios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit, OnDestroy {
  anuncios: Anuncio[] = [];
  nuevoAnuncio: Anuncio = { titulo: '', contenido: '' };
  mostrarFormulario = false;
  esAdminOProfesor = false; 
  private authSub: Subscription | undefined;

  constructor(
    private anunciosService: AnunciosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarAnuncios();
    
    // Suscribirse a los cambios de usuario para verificar el rol
    this.authSub = this.authService.currentUser$.subscribe(user => {
      if (user && (user.rol === 'profesor' || user.rol === 'administrador')) {
        this.esAdminOProfesor = true;
      } else {
        this.esAdminOProfesor = false;
        this.mostrarFormulario = false; // Ocultar formulario si pierde permisos
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  cargarAnuncios(): void {
    this.anunciosService.getAnuncios().subscribe({
      next: (res) => {
        if (res.success) {
          this.anuncios = res.anuncios;
        }
      },
      error: (err) => console.error('Error al cargar anuncios', err)
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  crearAnuncio(): void {
    if (!this.nuevoAnuncio.titulo.trim() || !this.nuevoAnuncio.contenido.trim()) {
      return;
    }

    this.anunciosService.createAnuncio(this.nuevoAnuncio).subscribe({
      next: (res) => {
        if (res.success) {
          // Optimistic UI Update: agregar al inicio
          this.anuncios.unshift(res.anuncio);
          this.nuevoAnuncio = { titulo: '', contenido: '' };
          this.mostrarFormulario = false;
        }
      },
      error: (err) => console.error('Error al crear anuncio', err)
    });
  }
}
