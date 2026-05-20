import { Injectable, signal, computed } from '@angular/core';
import { Evaluacion, Pregunta } from './evaluar.model';

@Injectable({ providedIn: 'root' })
export class EvaluarService {
  private _evaluaciones = signal<Evaluacion[]>([]);
  private _nextId = signal<number>(1);

  readonly evaluaciones = computed(() => this._evaluaciones());

  crearEvaluacion(titulo: string): Evaluacion {
    const nueva: Evaluacion = {
      id: this._nextId(),
      titulo: titulo.trim(),
      preguntas: [],
      fechaCreacion: new Date(),
      calificacionFinal: null,
    };
    this._nextId.update((id) => id + 1);
    this._evaluaciones.update((lista) => [...lista, nueva]);
    return nueva;
  }

  agregarPregunta(evaluacionId: number, textoPregunta: string, respuestaCorrecta: string): void {
    this._evaluaciones.update((lista) =>
      lista.map((ev) => {
        if (ev.id !== evaluacionId) return ev;
        const nuevaPregunta: Pregunta = {
          id: ev.preguntas.length + 1,
          texto: textoPregunta.trim(),
          respuestaCorrecta: respuestaCorrecta.trim(),
          calificacion: null,
        };
        return { ...ev, preguntas: [...ev.preguntas, nuevaPregunta] };
      })
    );
  }

  asignarCalificacion(evaluacionId: number, preguntaId: number, calificacion: number): void {
    this._evaluaciones.update((lista) =>
      lista.map((ev) => {
        if (ev.id !== evaluacionId) return ev;
        const preguntas = ev.preguntas.map((p) =>
          p.id === preguntaId ? { ...p, calificacion } : p
        );
        const calificadas = preguntas.filter((p) => p.calificacion !== null);
        const calificacionFinal =
          calificadas.length === preguntas.length && preguntas.length > 0
            ? calificadas.reduce((sum, p) => sum + (p.calificacion ?? 0), 0) / preguntas.length
            : null;
        return { ...ev, preguntas, calificacionFinal };
      })
    );
  }

  eliminarEvaluacion(id: number): void {
    this._evaluaciones.update((lista) => lista.filter((ev) => ev.id !== id));
  }

  obtenerEvaluacion(id: number): Evaluacion | undefined {
    return this._evaluaciones().find((ev) => ev.id === id);
  }
}