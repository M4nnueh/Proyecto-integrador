import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluarService } from './evaluar.service';

@Component({
  selector: 'app-evaluar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.css',
})
export class EvaluarComponent {
  private svc = inject(EvaluarService);
  readonly evaluacion = this.svc.evaluacion;

  asignarCalificacion(preguntaId: number, valor: number) {
    if (valor < 0 || valor > 5) return;
    this.svc.asignarCalificacion(preguntaId, valor);
  }

  reiniciar() {
    this.svc.reiniciarEvaluacion();
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
      (ev.preguntas.filter(p => p.calificacion !== null).length / ev.preguntas.length) * 100
    );
  }
}