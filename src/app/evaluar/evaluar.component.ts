import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluarService } from './evaluar.service';

@Component({
  selector: 'app-evaluar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.css',
})
export class EvaluarComponent implements OnInit {
  private svc = inject(EvaluarService);

  readonly evaluacion = this.svc.evaluacion;
  readonly cargando = this.svc.cargando;
  readonly guardado = this.svc.guardado;
  readonly error = this.svc.error;

  ngOnInit(): void {
    this.svc.cargarDesdeBackend();
  }

  responder(preguntaId: number, opcionId: string) {
    this.svc.responderPregunta(preguntaId, opcionId);
  }

  enviar() {
    this.svc.enviarEvaluacion();
  }

  reiniciar() {
    this.svc.reiniciarEvaluacion();
  }

  todasRespondidas(): boolean {
    return this.svc.todasRespondidas();
  }

  estrellas(nota: number | null): string {
    if (nota === null) return '—';
    const llenas = Math.round(nota);
    return '★'.repeat(llenas) + '☆'.repeat(5 - llenas);
  }

  colorNota(nota: number | null): string {
    if (nota === null) return '';
    if (nota >= 4) return 'nota-alta';
    if (nota >= 2.5) return 'nota-media';
    return 'nota-baja';
  }

  porcentajeCompletado(): number {
    const ev = this.evaluacion();
    if (!ev.preguntas.length) return 0;
    return Math.round(
      (ev.preguntas.filter(p => p.respuestaEstudiante !== null).length / ev.preguntas.length) * 100
    );
  }

  correctas(): number {
    return this.evaluacion().preguntas.filter(p => p.esCorrecta === true).length;
  }
}