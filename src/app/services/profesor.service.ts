import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RendimientoUnidad {
  unidad: string;
  promedio: number;
}

export interface ProfesorStats {
  cursosImpartidos: number;
  alumnosActivos: number;
  evaluacionesPendientes: number;
  promedioGeneral: number;
  rendimientoPorUnidad: RendimientoUnidad[];
}

export interface ProfesorStatsResponse {
  success: boolean;
  stats?: ProfesorStats;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = 'http://localhost:8080/api/profesor';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<ProfesorStatsResponse> {
    return this.http.get<ProfesorStatsResponse>(`${this.apiUrl}/stats`);
  }
}
