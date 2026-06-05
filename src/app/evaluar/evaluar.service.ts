import { Injectable, signal, computed } from '@angular/core';
import { Evaluacion, CUESTIONARIO_PREDETERMINADO } from './evaluar.model';

@Injectable({ providedIn: 'root' })
export class EvaluarService {
  private _evaluacion = signal<Evaluacion>({
    ...CUESTIONARIO_PREDETERMINADO,
    preguntas: CUESTIONARIO_PREDETERMINADO.preguntas.map(p => ({ ...p })),
    fechaCreacion: new Date(),
  });

  readonly evaluacion = computed(() => this._evaluacion());

  responderPregunta(preguntaId: number, opcionId: string): void {
    this._evaluacion.update((ev) => {
      if (ev.enviada) return ev;
      const preguntas = ev.preguntas.map((p) =>
        p.id === preguntaId ? { ...p, respuestaEstudiante: opcionId } : p
      );
      return { ...ev, preguntas };
    });
  }

  enviarEvaluacion(): void {
    this._evaluacion.update((ev) => {
      const preguntas = ev.preguntas.map((p) => ({
        ...p,
        esCorrecta: p.respuestaEstudiante === p.respuestaCorrecta
      }));
      const correctas = preguntas.filter(p => p.esCorrecta).length;
      const calificacionFinal = (correctas / preguntas.length) * 5;
      return { ...ev, preguntas, calificacionFinal, enviada: true };
    });
  }

  reiniciarEvaluacion(): void {
    this._evaluacion.set({
      ...CUESTIONARIO_PREDETERMINADO,
      preguntas: CUESTIONARIO_PREDETERMINADO.preguntas.map(p => ({
        ...p,
        respuestaEstudiante: null,
        esCorrecta: null
      })),
      fechaCreacion: new Date(),
      calificacionFinal: null,
      enviada: false,
    });
  }

  todasRespondidas(): boolean {
    return this._evaluacion().preguntas.every(p => p.respuestaEstudiante !== null);
  }
}