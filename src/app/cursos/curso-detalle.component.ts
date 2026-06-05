import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './curso-detalle.component.html',
})
export class CursoDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  slug: string = '';
  titulo: string = '';
  descripcion: string = '';
  profesor: string = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
      this.cargarInfoCurso();
    });
  }

  cargarInfoCurso() {
    if (this.slug === 'taylor') {
      this.titulo = 'Polinomio de Taylor';
      this.descripcion = 'Aproximación de funciones reales mediante polinomios infinitos. Estudiaremos la serie de Maclaurin y las aplicaciones prácticas en el cálculo diferencial e integral.';
      this.profesor = 'Efraín Vásquez Millán';
    } else if (this.slug === 'ecuacion-1var') {
      this.titulo = 'Ecuaciones de 1 variable';
      this.descripcion = 'Métodos iterativos para resolver ecuaciones no lineales de una variable. Aprenderemos métodos de búsqueda incremental, bisección, regla falsa y Newton-Raphson.';
      this.profesor = 'Diego Fernando Chicaiza Burbano';
    } else if (this.slug === 'aproximacion') {
      this.titulo = 'Aproximación de un polinomio';
      this.descripcion = 'Interpolación y aproximación polinomial de conjuntos de datos discretos. Se cubrirá el ajuste de curvas, interpolación de Lagrange y diferencias divididas de Newton.';
      this.profesor = 'Efraín Vásquez Millán';
    } else {
      this.titulo = 'Curso no encontrado';
      this.descripcion = 'El curso que intentas buscar no está disponible o la URL es incorrecta.';
      this.profesor = '';
    }
  }
}
