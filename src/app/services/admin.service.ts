import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './auth.service';

export interface AdminStats {
  totalUsuarios: number;
  totalEstudiantes: number;
  totalProfesores: number;
  totalAdmins: number;
  ultimosUsuarios: (User & { fechaCreacion: string })[];
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
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<StatsResponse> {
    return this.http.get<StatsResponse>(`${this.apiUrl}/stats`);
  }
}
