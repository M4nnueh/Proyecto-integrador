import { Injectable, signal, computed, inject } from '@angular/core';
import { Evaluacion, CUESTIONARIO_PREDETERMINADO } from './evaluar.model';
import { EvaluarBackendService } from './evaluar-backend.service';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class EvaluarService {
  private backend = inject(EvaluarBackendService);
  private auth = inject(AuthService);

  private _evaluacion = signal<Evaluacion>({
    ...CUESTIONARIO_PREDETERMINADO,
    preguntas: CUESTIONARIO_PREDETERMINADO.preguntas.map(p => ({ ...p })),
    fechaCreacion: new Date(),
  });

  private _cargando = signal<boolean>(false);
  private _guardado = signal<boolean>(false);
  private _error = signal<string | null>(null);

  readonly evaluacion = computed(() => this._evaluacion());
  readonly cargando = computed(() => this._cargando());
  readonly guardado = computed(() => this._guardado());
  readonly error = computed(() => this._error());

  cargarDesdeBackend(): void {
    this._cargando.set(true);
    this.backend.getEvaluacion(1).subscribe({
      next: (data) => {
        const preguntas = data.preguntas.map(p => ({
          id: p.id,
          texto: p.texto,
          opciones: p.opciones,
          respuestaCorrecta: p.respuestaCorrecta || '',
          respuestaEstudiante: null,
          esCorrecta: null
        }));
        this._evaluacion.update(ev => ({ ...ev, titulo: data.titulo, preguntas }));
        this._cargando.set(false);
      },
      error: () => {
        this._cargando.set(false);
      }
    });
  }

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
      const calificacion = parseFloat(((correctas / preguntas.length) * 5).toFixed(2));
      return { ...ev, preguntas, calificacionFinal: calificacion, enviada: true };
    });

    const ev = this._evaluacion();
    const user = this.auth.getCurrentUser();
    const respuestas: { [key: number]: string } = {};
    ev.preguntas.forEach(p => {
      if (p.respuestaEstudiante) respuestas[p.id] = p.respuestaEstudiante;
    });

    this.backend.guardarResultado(1, {
      estudianteEmail: user?.email || 'anonimo@numtech.com',
      respuestas,
      correctas: ev.preguntas.filter(p => p.esCorrecta).length,
      total: ev.preguntas.length,
      calificacion: ev.calificacionFinal ?? 0
    }).subscribe({
      next: () => this._guardado.set(true),
      error: (err) => this._error.set('No se pudo guardar el resultado en el servidor.')
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
    this._guardado.set(false);
    this._error.set(null);
  }

  todasRespondidas(): boolean {
    return this._evaluacion().preguntas.every(p => p.respuestaEstudiante !== null);
  }
}