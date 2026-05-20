import { Injectable, signal } from '@angular/core';
import { Tema } from './tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemasService {
  // Lista inicial de temas predefinidos (basados en los archivos C que existen)
  private initialTemas: Tema[] = [
    {
      id: '1',
      titulo: 'Método de Bisección',
      descripcion: 'Método cerrado para encontrar raíces de funciones continuas mediante la división de intervalos en mitades.',
      biblioteca: 'Biseccion.c'
    },
    {
      id: '2',
      titulo: 'Método de Newton-Raphson',
      descripcion: 'Método abierto que utiliza la derivada de la función para encontrar raíces con rápida convergencia.',
      biblioteca: 'newton.c'
    },
    {
      id: '3',
      titulo: 'Polinomio de Taylor',
      descripcion: 'Aproximación de funciones mediante sumas de términos de derivadas locales.',
      biblioteca: 'taylor.c'
    }
  ];

  // Signal que mantiene el estado reactivo de la lista de temas
  readonly temas = signal<Tema[]>(this.initialTemas);

  constructor() {}

  // Obtener un tema por su ID
  obtenerTema(id: string): Tema | undefined {
    return this.temas().find(t => t.id === id);
  }

  // Crear un nuevo tema
  crearTema(titulo: string, descripcion: string, biblioteca: string): void {
    const nuevoTema: Tema = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      biblioteca
    };
    
    // Actualizar la lista reactivamente
    this.temas.update(temasActuales => [...temasActuales, nuevoTema]);
  }

  // Eliminar un tema
  eliminarTema(id: string): void {
    this.temas.update(temasActuales => temasActuales.filter(t => t.id !== id));
  }
}
