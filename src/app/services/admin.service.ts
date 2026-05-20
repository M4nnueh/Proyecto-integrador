import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './auth.service';

export interface AdminStats {
  totalUsuarios: number;
  totalEstudiantes: number;
  totalProfesores: number;
  totalAdmins: number;
  ultimosUsuarios: (User & { fecha_creacion: string })[];
}

export interface StatsResponse {
  success: boolean;
  stats?: AdminStats;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/stats`);
  }
}
