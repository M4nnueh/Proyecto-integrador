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

  asignarCalificacion(preguntaId: number, calificacion: number): void {
    this._evaluacion.update((ev) => {
      const preguntas = ev.preguntas.map((p) =>
        p.id === preguntaId ? { ...p, calificacion } : p
      );
      const calificadas = preguntas.filter((p) => p.calificacion !== null);
      const calificacionFinal =
        calificadas.length === preguntas.length && preguntas.length > 0
          ? calificadas.reduce((sum, p) => sum + (p.calificacion ?? 0), 0) / preguntas.length
          : null;
      return { ...ev, preguntas, calificacionFinal };
    });
  }

  reiniciarEvaluacion(): void {
    this._evaluacion.set({
      ...CUESTIONARIO_PREDETERMINADO,
      preguntas: CUESTIONARIO_PREDETERMINADO.preguntas.map(p => ({ ...p, calificacion: null })),
      fechaCreacion: new Date(),
      calificacionFinal: null,
    });
  }
}