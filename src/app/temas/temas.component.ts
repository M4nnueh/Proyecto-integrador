import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemasService } from './temas.service';

@Component({
  selector: 'app-temas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent {
  private temasService = inject(TemasService);

  // Expose signal to template
  temas = this.temasService.temas;

  // Form model
  nuevoTitulo = '';
  nuevaDescripcion = '';

  agregarTema() {
    if (!this.nuevoTitulo || !this.nuevaDescripcion) return;
    
    this.temasService.agregarTema({
      titulo: this.nuevoTitulo,
      descripcion: this.nuevaDescripcion,
      bibliotecas: 'NumPy, Matplotlib, Math.h' // Asignación automática por defecto
    });

    // Reset form
    this.nuevoTitulo = '';
    this.nuevaDescripcion = '';
  }

  eliminarTema(id: string) {
    this.temasService.eliminarTema(id);
  }
}
