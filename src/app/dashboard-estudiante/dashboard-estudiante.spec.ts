import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-estudiante.html',
  styleUrls: ['./dashboard-estudiante.css'],
})
export class DashboardEstudianteComponent {
  rol = 'Estudiante';
}
