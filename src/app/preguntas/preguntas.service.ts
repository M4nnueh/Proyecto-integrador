import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PruebaGeneral, PreguntaTeorica } from './preguntas.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PreguntasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/preguntas';

  private _pruebas = signal<PruebaGeneral[]>([]);
  readonly pruebas = computed(() => this._pruebas());

  constructor() {
    this.cargarPruebasDesdeServidor();
  }

  cargarPruebasDesdeServidor(): void {
    this.http.get<PruebaGeneral[]>(this.apiUrl).subscribe({
      next: (data) => this._pruebas.set(data),
      error: (err) => console.error('Error al recuperar las pruebas del servidor', err),
    });
  }

  crearPrueba(titulo: string): void {
    this.http.post<PruebaGeneral>(this.apiUrl, { titulo: titulo.trim() }).subscribe({
      error: (err) => console.error('Error al crear la prueba', err),
    });
  }

  agregarPregunta(pruebaId: number, textoPregunta: string, respuestaCorrecta: string): void {
    const body = {
      texto: textoPregunta.trim(),
      respuestaCorrecta: respuestaCorrecta.trim(),
    };

    this.http.post<PreguntaTeorica>(`${this.apiUrl}/${pruebaId}/agregar`, body).subscribe({
      next: () => this.cargarPruebasDesdeServidor(),
      error: (err) => console.error('Error al insertar el reactivo teórico', err),
    });
  }

  eliminarPrueba(id: number): void {
    this.http.delete<any>(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.cargarPruebasDesdeServidor(),
      error: (err) => console.error('Error al eliminar el banco de preguntas', err),
    });
  }

  obtenerPrueba(id: number): PruebaGeneral | undefined {
    return this._pruebas().find((pr) => pr.id === id);
  }
}
