import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { EvaluarService } from './evaluar.service';
import { Evaluacion } from './evaluar.model';
import { AuthService } from '../services/auth.service';

type Vista = 'lista' | 'nueva' | 'detalle';

@Component({
  selector: 'app-evaluar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.css',
})
export class EvaluarComponent {
  private svc = inject(EvaluarService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  readonly evaluaciones = this.svc.evaluaciones;

  vista = signal<Vista>('lista');
  evaluacionSeleccionada = signal<Evaluacion | null>(null);

  volver(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      const rolRuta = user.rol === 'administrador' ? 'admin' : user.rol;
      this.router.navigate([`/dashboard/${rolRuta}`]);
    } else {
      this.router.navigate(['/']);
    }
  }

  nuevoTitulo = '';
  errorTitulo = '';
  nuevaPregunta = '';
  nuevaRespuesta = '';
  errorPregunta = '';

  irANueva() { this.nuevoTitulo = ''; this.errorTitulo = ''; this.vista.set('nueva'); }
  irALista() { this.vista.set('lista'); this.evaluacionSeleccionada.set(null); }

  abrirDetalle(ev: Evaluacion) {
    this.nuevaPregunta = ''; this.nuevaRespuesta = ''; this.errorPregunta = '';
    this.evaluacionSeleccionada.set(ev);
    this.vista.set('detalle');
  }

  private refrescar() {
    const id = this.evaluacionSeleccionada()?.id;
    if (id !== undefined) this.evaluacionSeleccionada.set(this.svc.obtenerEvaluacion(id) ?? null);
  }

  crearEvaluacion() {
    if (!this.nuevoTitulo.trim()) { this.errorTitulo = 'El título no puede estar vacío.'; return; }
    this.svc.crearEvaluacion(this.nuevoTitulo);
    this.irALista();
  }

  eliminar(id: number) { this.svc.eliminarEvaluacion(id); }

  agregarPregunta() {
    const ev = this.evaluacionSeleccionada();
    if (!ev) return;
    if (!this.nuevaPregunta.trim()) { this.errorPregunta = 'Escribe el texto de la pregunta.'; return; }
    if (!this.nuevaRespuesta.trim()) { this.errorPregunta = 'Escribe la respuesta correcta.'; return; }
    this.svc.agregarPregunta(ev.id, this.nuevaPregunta, this.nuevaRespuesta);
    this.nuevaPregunta = ''; this.nuevaRespuesta = ''; this.errorPregunta = '';
    this.refrescar();
  }

  asignarCalificacion(preguntaId: number, valor: string) {
    const ev = this.evaluacionSeleccionada();
    if (!ev) return;
    const num = parseFloat(valor);
    if (isNaN(num) || num < 0 || num > 5) return;
    this.svc.asignarCalificacion(ev.id, preguntaId, num);
    this.refrescar();
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

  porcentajeCompletado(ev: Evaluacion): number {
    if (!ev.preguntas.length) return 0;
    return Math.round((ev.preguntas.filter(p => p.calificacion !== null).length / ev.preguntas.length) * 100);
  }
}