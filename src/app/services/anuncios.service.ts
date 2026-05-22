import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Anuncio {
  id?: number;
  titulo: string;
  contenido: string;
  fecha_creacion?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  private apiUrl = 'http://localhost:3000/api/anuncios';

  constructor(private http: HttpClient) { }

  getAnuncios(): Observable<{ success: boolean; anuncios: Anuncio[] }> {
    return this.http.get<{ success: boolean; anuncios: Anuncio[] }>(this.apiUrl);
  }

  createAnuncio(anuncio: Anuncio): Observable<{ success: boolean; message: string; anuncio: Anuncio }> {
    return this.http.post<{ success: boolean; message: string; anuncio: Anuncio }>(this.apiUrl, anuncio);
  }
}
