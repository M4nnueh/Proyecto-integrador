import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { EstudianteService, Curso } from '../services/estudiante.service';
import { AuthService, User } from '../services/auth.service';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.css',
})
export class DashboardEstudianteComponent implements OnInit, OnDestroy {
  rol = 'Estudiante';
  usuario: User | null = null;
  cursos: Curso[] = [];
  isLoadingCursos = true;
  private destroy$ = new Subject<void>();

  constructor(
    private estudianteService: EstudianteService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([this.authService.authReady$, this.authService.currentUser$]).pipe(
      filter(([ready]) => ready),
      map(([, user]) => user || this.authService.getCurrentUser()),
      distinctUntilChanged((previous, current) => previous?.id === current?.id && previous?.email === current?.email && previous?.rol === current?.rol),
      takeUntil(this.destroy$)
    ).subscribe(user => {
      this.usuario = user;

      if (user?.rol !== 'estudiante') {
        this.limpiarEstado();
        const dashboardRoute = this.authService.getDashboardRoute(user);
        this.router.navigateByUrl(dashboardRoute || '/login', { replaceUrl: true });
        return;
      }

      if (user.id) {
        this.cargarCursos(user.id);
      } else {
        this.limpiarEstado();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  private limpiarEstado(): void {
    this.cursos = [];
    this.isLoadingCursos = false;
  }
}
