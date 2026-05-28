import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { HeaderComponent } from '../components/header/header.component';
import { ProfesorService, ProfesorStats, RendimientoUnidad } from '../services/profesor.service';
import { AuthService } from '../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard-profesor.html',
  styleUrls: ['./dashboard-profesor.css'],
})
export class DashboardProfesorComponent implements OnInit, AfterViewChecked, OnDestroy {
  rol = 'Profesor';
  stats: ProfesorStats | null = null;
  isLoading = true;
  errorMessage = '';

  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;

  private lineChart: Chart | null = null;
  private chartPending = false;
  private destroy$ = new Subject<void>();

  constructor(
    private profesorService: ProfesorService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    combineLatest([this.authService.authReady$, this.authService.currentUser$]).pipe(
      filter(([ready]) => ready),
      map(([, user]) => user),
      distinctUntilChanged((previous, current) => previous?.email === current?.email && previous?.rol === current?.rol),
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user?.rol === 'profesor' || user?.rol === 'administrador') {
        this.cargarEstadisticas();
        return;
      }

      this.limpiarEstado();
      const dashboardRoute = this.authService.getDashboardRoute(user);
      this.router.navigateByUrl(dashboardRoute || '/login', { replaceUrl: true });
    });
  }

  ngAfterViewChecked(): void {
    if (this.chartPending && this.stats && this.lineChartCanvas?.nativeElement) {
      this.chartPending = false;
      this.crearGrafica();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyChart();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.destroyChart();

    this.profesorService.getDashboardStats().subscribe({
      next: (response) => {
        if (response.success && response.stats) {
          this.stats = this.normalizeStats(response.stats);
          this.isLoading = false;
          this.chartPending = true;
          this.cdr.detectChanges();
        } else {
          this.stats = null;
          this.errorMessage = response.message || 'Error al cargar las estadisticas';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching profesor stats:', err);
        this.stats = null;
        this.errorMessage = 'Ocurrio un error al intentar conectar con el servidor.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  crearGrafica(): void {
    if (!this.stats) return;

    try {
      this.destroyChart();

      const labels = this.stats.rendimientoPorUnidad.map(r => r.unidad);
      const data = this.stats.rendimientoPorUnidad.map(r => r.promedio);

      this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Promedio General',
            data,
            borderColor: '#198754',
            backgroundColor: 'rgba(25, 135, 84, 0.2)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#198754',
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              min: 0,
              max: 10,
              ticks: { stepSize: 1 }
            }
          }
        }
      });
    } catch (e) {
      console.error('Error al dibujar la grafica del profesor:', e);
    }
  }

  private normalizeStats(stats: ProfesorStats): ProfesorStats {
    return {
      cursosImpartidos: Number(stats.cursosImpartidos) || 0,
      alumnosActivos: Number(stats.alumnosActivos) || 0,
      evaluacionesPendientes: Number(stats.evaluacionesPendientes) || 0,
      promedioGeneral: Number(stats.promedioGeneral) || 0,
      rendimientoPorUnidad: (stats.rendimientoPorUnidad || []).map((item: RendimientoUnidad) => ({
        unidad: item.unidad,
        promedio: Number(item.promedio) || 0
      }))
    };
  }

  private destroyChart(): void {
    this.lineChart?.destroy();
    this.lineChart = null;
  }

  private limpiarEstado(): void {
    this.stats = null;
    this.errorMessage = '';
    this.isLoading = false;
    this.chartPending = false;
    this.destroyChart();
  }
}
