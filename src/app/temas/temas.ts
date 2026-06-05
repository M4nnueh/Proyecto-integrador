import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TemasService } from './temas.service';
import { Tema } from './tema.model';
import { AuthService } from '../services/auth.service';
import { EstudianteService, Curso } from '../services/estudiante.service';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-temas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './temas.html',
  styleUrl: './temas.css'
})
export class Temas implements OnInit, OnDestroy {
  private temasService = inject(TemasService);
  private authService = inject(AuthService);
  private estudianteService = inject(EstudianteService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  
  temas = this.temasService.temas;
  
  // Cursos
  cursos: Curso[] = [];
  isLoadingCursos = true;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Los temas son públicos, se cargan directamente sin esperar auth
    this.temasService.cargarTemas();

    // Los cursos sí requieren usuario autenticado con ID
    combineLatest([this.authService.authReady$, this.authService.currentUser$]).pipe(
      filter(([ready]) => ready),
      map(([, user]) => user || this.authService.getCurrentUser()),
      distinctUntilChanged((previous, current) => previous?.id === current?.id && previous?.email === current?.email && previous?.rol === current?.rol),
      takeUntil(this.destroy$)
    ).subscribe(user => {
      console.log('Usuario recibido en temas:', user);
      if (user?.id) {
        console.log('Cargando cursos para ID:', user.id);
        this.cargarCursos(user.id);
      } else {
        console.log('Usuario sin ID, no se cargan cursos');
        this.isLoadingCursos = false;
        this.cursos = [];
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarCursos(id: number): void {
    this.isLoadingCursos = true;
    this.cdr.detectChanges();
    this.estudianteService.getCursos(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.cursos = res.cursos;
        }
        this.isLoadingCursos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar cursos:', err);
        this.isLoadingCursos = false;
        this.cdr.detectChanges();
      }
    });
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
