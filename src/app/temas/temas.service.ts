import { Injectable, signal } from '@angular/core';
import { Tema } from './temas.model';

@Injectable({
  providedIn: 'root'
})
export class TemasService {
  private temasSignal = signal<Tema[]>([
    {
      id: '1',
      titulo: 'Introducción a Polinomios',
      descripcion: 'Aprenderemos la base de los polinomios.',
      bibliotecas: 'NumPy, Matplotlib'
    }
  ]);

  readonly temas = this.temasSignal.asReadonly();

  agregarTema(nuevoTema: Omit<Tema, 'id'>) {
    const tema: Tema = {
      ...nuevoTema,
      id: Math.random().toString(36).substring(2, 9)
    };
    this.temasSignal.update(temas => [...temas, tema]);
  }

  eliminarTema(id: string) {
    this.temasSignal.update(temas => temas.filter(t => t.id !== id));
  }
}
