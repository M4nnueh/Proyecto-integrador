import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { AdminService, AdminStats } from '../services/admin.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css'],
})
export class DashboardAdminComponent implements OnInit {
  rol = 'Administrador';
  stats: AdminStats | null = null;
  isLoading = true;
  errorMessage = '';
  
  private pieChart: Chart | null = null;
  private barChart: Chart | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        if (response.success && response.stats) {
          this.stats = response.stats;
          // Esperar a que Angular renderice el DOM antes de crear los charts
          setTimeout(() => this.crearGraficas(), 100);
        } else {
          this.errorMessage = response.message || 'Error al cargar las estadísticas';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching admin stats:', err);
        this.errorMessage = 'Ocurrió un error al intentar conectar con el servidor.';
        this.isLoading = false;
      }
    });
  }

  crearGraficas(): void {
    if (!this.stats) return;

    // Destruir charts previos si existen (para evitar duplicados al recargar)
    if (this.pieChart) this.pieChart.destroy();
    if (this.barChart) this.barChart.destroy();

    // === GRÁFICA CIRCULAR (Pie Chart) ===
    const pieCanvas = document.getElementById('pieChartRoles') as HTMLCanvasElement;
    if (pieCanvas) {
      this.pieChart = new Chart(pieCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Estudiantes', 'Profesores', 'Administradores'],
          datasets: [{
            data: [
              this.stats.totalEstudiantes,
              this.stats.totalProfesores,
              this.stats.totalAdmins
            ],
            backgroundColor: [
              'rgba(25, 135, 84, 0.85)',
              'rgba(13, 202, 240, 0.85)',
              'rgba(255, 193, 7, 0.85)'
            ],
            borderColor: [
              'rgba(25, 135, 84, 1)',
              'rgba(13, 202, 240, 1)',
              'rgba(255, 193, 7, 1)'
            ],
            borderWidth: 2,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                usePointStyle: true,
                pointStyleWidth: 12,
                font: { size: 13 }
              }
            },
            title: {
              display: true,
              text: 'Distribución por Rol',
              font: { size: 16, weight: 'bold' },
              padding: { bottom: 15 }
            }
          }
        }
      });
    }

    // === GRÁFICA DE BARRAS (Bar Chart) ===
    const barCanvas = document.getElementById('barChartRoles') as HTMLCanvasElement;
    if (barCanvas) {
      this.barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
          labels: ['Estudiantes', 'Profesores', 'Administradores'],
          datasets: [{
            label: 'Cantidad de usuarios',
            data: [
              this.stats.totalEstudiantes,
              this.stats.totalProfesores,
              this.stats.totalAdmins
            ],
            backgroundColor: [
              'rgba(25, 135, 84, 0.7)',
              'rgba(13, 202, 240, 0.7)',
              'rgba(255, 193, 7, 0.7)'
            ],
            borderColor: [
              'rgba(25, 135, 84, 1)',
              'rgba(13, 202, 240, 1)',
              'rgba(255, 193, 7, 1)'
            ],
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Usuarios por Rol',
              font: { size: 16, weight: 'bold' },
              padding: { bottom: 15 }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                font: { size: 12 }
              },
              grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: {
              ticks: { font: { size: 13 } },
              grid: { display: false }
            }
          }
        }
      });
    }
  }
}
