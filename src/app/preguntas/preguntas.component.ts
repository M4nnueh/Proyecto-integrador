import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PreguntasService } from './preguntas.service';
import { PruebaGeneral } from './preguntas.model';
import { AuthService } from '../services/auth.service';

type Vista = 'lista' | 'nueva' | 'detalle';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css',
})
export class PreguntasComponent {
  private svc = inject(PreguntasService);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly pruebas = this.svc.pruebas;

  vista = signal<Vista>('lista');
  pruebaSeleccionada = signal<PruebaGeneral | null>(null);

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

  irANueva() {
    this.nuevoTitulo = '';
    this.errorTitulo = '';
    this.vista.set('nueva');
  }
  irALista() {
    this.vista.set('lista');
    this.pruebaSeleccionada.set(null);
  }

  abrirDetalle(pr: PruebaGeneral) {
    this.nuevaPregunta = '';
    this.nuevaRespuesta = '';
    this.errorPregunta = '';
    this.pruebaSeleccionada.set(pr);
    this.vista.set('detalle');
  }

  private refrescar() {
    const id = this.pruebaSeleccionada()?.id;
    if (id !== undefined) this.pruebaSeleccionada.set(this.svc.obtenerPrueba(id) ?? null);
  }

  crearPrueba() {
    if (!this.nuevoTitulo.trim()) {
      this.errorTitulo = 'El título no puede estar vacío.';
      return;
    }
    this.svc.crearPrueba(this.nuevoTitulo);
    this.irALista();
  }

  eliminar(id: number) {
    this.svc.eliminarPrueba(id);
  }

  agregarPregunta() {
    const pr = this.pruebaSeleccionada();
    if (!pr) return;
    if (!this.nuevaPregunta.trim()) {
      this.errorPregunta = 'Escribe el texto de la pregunta.';
      return;
    }
    if (!this.nuevaRespuesta.trim()) {
      this.errorPregunta = 'Escribe la respuesta teórica correcta.';
      return;
    }
    this.svc.agregarPregunta(pr.id, this.nuevaPregunta, this.nuevaRespuesta);
    this.nuevaPregunta = '';
    this.nuevaRespuesta = '';
    this.errorPregunta = '';
    this.refrescar();
  }
}
