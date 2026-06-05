import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface TemaDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  biblioteca: string;
}

@Component({
  selector: 'app-tema-detalle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-wrapper">

      <!-- Hero Header -->
      <div class="hero-header" *ngIf="!isLoading && tema">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <button (click)="volver()" class="back-btn">
            <span class="back-icon">←</span> Volver a Temas
          </button>
          <div class="hero-badge">Análisis Numérico</div>
          <h1 class="hero-title">{{ tema.titulo }}</h1>
          <div class="hero-divider"></div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-screen">
        <div class="loading-spinner"></div>
        <p class="loading-text">Cargando contenido...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="!isLoading && error" class="container py-5">
        <div class="error-card">
          <div class="error-icon">⚠️</div>
          <h3>No se encontró el tema</h3>
          <p>El tema solicitado no está disponible.</p>
          <button (click)="volver()" class="btn-primary-custom">Volver a Temas</button>
        </div>
      </div>

      <!-- Content -->
      <div *ngIf="!isLoading && tema" class="container content-container">
        <div class="content-card">
          <div class="tema-content" [innerHTML]="tema.descripcion"></div>
        </div>

        <!-- Footer card -->
        <div class="footer-cta">
          <span class="footer-icon">📚</span>
          <span>¿Listo para practicar? Accede a las evaluaciones de este método.</span>
          <button (click)="volver()" class="btn-back-footer">← Regresar a Temas</button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    * { box-sizing: border-box; }

    .page-wrapper {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      background: #f0f4f8;
    }

    /* ── HERO ── */
    .hero-header {
      position: relative;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
      padding: 3rem 0 2.5rem;
      overflow: hidden;
    }
    .hero-header::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero-header::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -5%;
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
      border-radius: 50%;
    }
    .hero-overlay { position: absolute; inset: 0; }
    .hero-content { position: relative; z-index: 2; }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #cbd5e1;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 1.5rem;
      backdrop-filter: blur(10px);
    }
    .back-btn:hover {
      background: rgba(255,255,255,0.2);
      color: #fff;
      transform: translateX(-3px);
    }
    .back-icon { font-size: 1rem; }

    .hero-badge {
      display: inline-block;
      background: linear-gradient(90deg, #6366f1, #0ea5e9);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 0.3rem 1rem;
      border-radius: 50px;
      margin-bottom: 1rem;
    }

    .hero-title {
      font-size: clamp(1.8rem, 4vw, 3rem);
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 1.5rem;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }

    .hero-divider {
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #6366f1, #0ea5e9);
      border-radius: 2px;
    }

    /* ── LOADING ── */
    .loading-screen {
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    .loading-spinner {
      width: 52px;
      height: 52px;
      border: 4px solid #e2e8f0;
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { color: #64748b; font-size: 0.95rem; }

    /* ── CONTENT ── */
    .content-container {
      padding-top: 2.5rem;
      padding-bottom: 4rem;
      max-width: 860px;
    }

    .content-card {
      background: #ffffff;
      border-radius: 16px;
      padding: 2.5rem 3rem;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 20px 40px -10px rgba(0,0,0,0.08);
      margin-bottom: 1.5rem;
    }

    /* ── TOPIC CONTENT (innerHTML) ── */
    .tema-content :global(h4),
    .tema-content ::ng-deep h4 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
      margin: 2rem 0 0.75rem;
      padding: 0.6rem 1rem;
      background: linear-gradient(90deg, #eef2ff, transparent);
      border-left: 4px solid #6366f1;
      border-radius: 0 8px 8px 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .tema-content ::ng-deep h4:first-child { margin-top: 0; }

    .tema-content ::ng-deep p {
      color: #475569;
      line-height: 1.8;
      margin-bottom: 1rem;
      font-size: 1rem;
    }

    .tema-content ::ng-deep ul {
      padding-left: 0;
      list-style: none;
      margin-bottom: 1rem;
    }

    .tema-content ::ng-deep ul li {
      position: relative;
      padding: 0.5rem 0.75rem 0.5rem 2.25rem;
      margin-bottom: 0.5rem;
      background: #f8fafc;
      border-radius: 8px;
      color: #475569;
      line-height: 1.6;
      font-size: 0.95rem;
      border: 1px solid #e2e8f0;
    }
    .tema-content ::ng-deep ul li::before {
      content: '✦';
      position: absolute;
      left: 0.75rem;
      top: 0.55rem;
      color: #6366f1;
      font-size: 0.65rem;
    }

    .tema-content ::ng-deep strong { color: #1e293b; }

    .tema-content ::ng-deep em {
      color: #6366f1;
      font-style: normal;
      font-weight: 500;
    }

    .tema-content ::ng-deep code {
      background: linear-gradient(135deg, #1e1e2e, #2d2d44);
      color: #a5f3fc;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      font-size: 0.88rem;
      font-family: 'Courier New', monospace;
      letter-spacing: 0.02em;
    }

    /* ── FOOTER CTA ── */
    .footer-cta {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      border-radius: 14px;
      padding: 1.25rem 1.75rem;
      color: #cbd5e1;
      font-size: 0.9rem;
      flex-wrap: wrap;
    }
    .footer-icon { font-size: 1.3rem; }
    .btn-back-footer {
      margin-left: auto;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #e2e8f0;
      padding: 0.5rem 1.25rem;
      border-radius: 50px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-back-footer:hover {
      background: rgba(255,255,255,0.2);
      color: white;
    }

    /* ── ERROR ── */
    .error-card {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    .error-icon { font-size: 3rem; margin-bottom: 1rem; }
    .btn-primary-custom {
      background: linear-gradient(135deg, #6366f1, #0ea5e9);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      cursor: pointer;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .content-card { padding: 1.5rem; }
      .footer-cta { flex-direction: column; text-align: center; }
      .btn-back-footer { margin: 0 auto; }
    }
  `]
})
export class TemaDetalleComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  tema: TemaDetalle | null = null;
  isLoading = true;
  error = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = true;
      this.isLoading = false;
      return;
    }

    this.http.get<TemaDetalle>(`http://localhost:8080/api/temas/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.tema = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al cargar tema:', err);
          this.error = true;
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  volver(): void {
    this.router.navigate(['/temas']);
  }
}
