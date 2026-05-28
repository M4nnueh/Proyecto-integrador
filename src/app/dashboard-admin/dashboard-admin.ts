import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { HeaderComponent } from '../components/header/header.component';
import { AdminService, AdminStats } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css'],
})
export class DashboardAdminComponent implements OnInit, AfterViewChecked, OnDestroy {
  rol = 'Administrador';
  stats: AdminStats | null = null;
  isLoading = true;
  errorMessage = '';

  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef<HTMLCanvasElement>;

  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;
  private chartsPending = false;
  private destroy$ = new Subject<void>();

  constructor(
    private adminService: AdminService,
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
      if (user?.rol === 'administrador') {
        this.cargarEstadisticas();
        return;
      }

      this.limpiarEstado();
      const dashboardRoute = this.authService.getDashboardRoute(user);
      this.router.navigateByUrl(dashboardRoute || '/login', { replaceUrl: true });
    });
  }

  ngAfterViewChecked(): void {
    if (this.chartsPending && this.stats && this.pieChartCanvas?.nativeElement && this.barChartCanvas?.nativeElement) {
      this.chartsPending = false;
      this.crearGraficas();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyCharts();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.destroyCharts();

    this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        if (response.success && response.stats) {
          this.stats = this.normalizeStats(response.stats);
          this.isLoading = false;
          this.chartsPending = true;
          this.cdr.detectChanges();
        } else {
          this.stats = null;
          this.errorMessage = response.message || 'Error al cargar las estadisticas';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching admin stats:', err);
        this.stats = null;
        this.errorMessage = 'Ocurrio un error al intentar conectar con el servidor.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  crearGraficas(): void {
    if (!this.stats) return;

    try {
      this.destroyCharts();

      this.pieChart = new Chart(this.pieChartCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: ['Estudiantes', 'Profesores', 'Administradores'],
          datasets: [{
            data: [
              this.stats.totalEstudiantes,
              this.stats.totalProfesores,
              this.stats.totalAdmins
            ],
            backgroundColor: ['#198754', '#0dcaf0', '#ffc107']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });

      this.barChart = new Chart(this.barChartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Estudiantes', 'Profesores', 'Administradores'],
          datasets: [{
            label: 'Usuarios',
            data: [
              this.stats.totalEstudiantes,
              this.stats.totalProfesores,
              this.stats.totalAdmins
            ],
            backgroundColor: ['#198754', '#0dcaf0', '#ffc107']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    } catch (e) {
      console.error('Error al dibujar las graficas:', e);
    }
  }

  private normalizeStats(stats: AdminStats): AdminStats {
    return {
      totalUsuarios: Number(stats.totalUsuarios) || 0,
      totalEstudiantes: Number(stats.totalEstudiantes) || 0,
      totalProfesores: Number(stats.totalProfesores) || 0,
      totalAdmins: Number(stats.totalAdmins) || 0,
      ultimosUsuarios: stats.ultimosUsuarios || []
    };
  }

  private destroyCharts(): void {
    this.pieChart?.destroy();
    this.barChart?.destroy();
    this.pieChart = null;
    this.barChart = null;
  }

  private limpiarEstado(): void {
    this.stats = null;
    this.errorMessage = '';
    this.isLoading = false;
    this.chartsPending = false;
    this.destroyCharts();
  }
}
