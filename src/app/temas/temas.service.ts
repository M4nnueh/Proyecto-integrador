import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tema } from './tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemasService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/temas';

  // Signal que mantiene el estado reactivo de la lista de temas
  readonly temas = signal<Tema[]>([]);

  cargarTemas(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        const mappedTemas = data.map(t => ({
          ...t,
          id: String(t.id)
        }));
        this.temas.set(mappedTemas);
      },
      error: (err) => console.error('Error al cargar temas desde el backend', err)
    });
  }

  obtenerTema(id: string): Tema | undefined {
    return this.temas().find(t => t.id === id);
  }
}
