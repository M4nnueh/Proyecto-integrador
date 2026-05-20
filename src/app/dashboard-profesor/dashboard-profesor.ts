import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-dashboard-profesor',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard-profesor.html',
  styleUrls: ['./dashboard-profesor.css'],
})
export class DashboardProfesorComponent {
  rol = 'Profesor';
}
