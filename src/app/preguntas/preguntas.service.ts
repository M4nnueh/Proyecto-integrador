import { Injectable, signal, computed } from '@angular/core';
import { PruebaGeneral, PreguntaTeorica } from './preguntas.model';

@Injectable({ providedIn: 'root' })
export class PreguntasService {
  private _pruebas = signal<PruebaGeneral[]>([]);
  private _nextId = signal<number>(1);

  readonly pruebas = computed(() => this._pruebas());

  crearPrueba(titulo: string): PruebaGeneral {
    const nueva: PruebaGeneral = {
      id: this._nextId(),
      titulo: titulo.trim(),
      preguntas: [],
      fechaCreacion: new Date(),
    };
    this._nextId.update((id) => id + 1);
    this._pruebas.update((lista) => [...lista, nueva]);
    return nueva;
  }

  agregarPregunta(pruebaId: number, textoPregunta: string, respuestaCorrecta: string): void {
    this._pruebas.update((lista) =>
      lista.map((pr) => {
        if (pr.id !== pruebaId) return pr;
        const nuevaPregunta: PreguntaTeorica = {
          id: pr.preguntas.length + 1,
          texto: textoPregunta.trim(),
          respuestaCorrecta: respuestaCorrecta.trim(),
        };
        return { ...pr, preguntas: [...pr.preguntas, nuevaPregunta] };
      }),
    );
  }

  eliminarPrueba(id: number): void {
    this._pruebas.update((lista) => lista.filter((pr) => pr.id !== id));
  }

  obtenerPrueba(id: number): PruebaGeneral | undefined {
    return this._pruebas().find((pr) => pr.id === id);
  }
}
