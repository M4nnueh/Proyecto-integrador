import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  id: number;
  nombre: string;
  urlRuta: string;
  descripcion?: string;
  profesor?: string;
}

export interface CursosResponse {
  success: boolean;
  cursos: Curso[];
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) {}

  getCursos(estudianteId: number): Observable<CursosResponse> {
    return this.http.get<CursosResponse>(`${this.apiUrl}/${estudianteId}/cursos`);
  }
}
