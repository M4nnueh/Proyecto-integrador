import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { EstudianteService, Curso } from '../services/estudiante.service';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.css',
})
export class DashboardEstudianteComponent implements OnInit {
  rol = 'Estudiante';
  usuario: User | null = null;
  cursos: Curso[] = [];
  isLoadingCursos = true;

  constructor(
    private estudianteService: EstudianteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser();
    if (this.usuario && this.usuario.id) {
      this.cargarCursos(this.usuario.id);
    } else {
      this.isLoadingCursos = false;
    }
  }

  cargarCursos(id: number): void {
    this.isLoadingCursos = true;
    this.estudianteService.getCursos(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.cursos = res.cursos;
        }
        this.isLoadingCursos = false;
      },
      error: (err) => {
        console.error('Error al cargar cursos:', err);
        this.isLoadingCursos = false;
      }
    });
  }
}
