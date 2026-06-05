import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OpcionBackend {
  id: string;
  texto: string;
}

export interface PreguntaBackend {
  id: number;
  texto: string;
  opciones: OpcionBackend[];
  respuestaCorrecta?: string;
}

export interface EvaluacionBackend {
  id: number;
  titulo: string;
  fechaCreacion: string;
  preguntas: PreguntaBackend[];
}

export interface ResultadoRequest {
  estudianteEmail: string;
  respuestas: { [preguntaId: number]: string };
  correctas: number;
  total: number;
  calificacion: number;
}

export interface ResultadoResponse {
  success: boolean;
  message: string;
  calificacion: number;
  correctas: number;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class EvaluarBackendService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/evaluaciones';

  getEvaluacion(id: number): Observable<EvaluacionBackend> {
    return this.http.get<EvaluacionBackend>(`${this.apiUrl}/${id}`);
  }

  guardarResultado(evaluacionId: number, resultado: ResultadoRequest): Observable<ResultadoResponse> {
    return this.http.post<ResultadoResponse>(`${this.apiUrl}/${evaluacionId}/resultado`, resultado);
  }

  getHistorial(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resultados/${email}`);
  }
}