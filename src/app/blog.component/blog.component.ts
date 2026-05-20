import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent {
  // Noticia principal (primicia)
  mainNews = {
    title: 'Lanzamiento del curso de Análisis Numérico',
    summary: 'Aprende métodos numéricos aplicados a la ingeniería con ejemplos en Python y MATLAB.',
    image:
      'https://images.pexels.com/photos/256514/pexels-photo-256514.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '15 de abril, 2025',
  };

  // Noticias secundarias (3 columnas)
  secondaryNews = [
    {
      title: 'Nuevo tutorial: Polinomio de Taylor',
      summary: 'Explicación paso a paso con visualizaciones interactivas.',
      image:
        'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '10 de abril, 2025',
    },
    {
      title: 'Webinar: Ecuaciones no lineales',
      summary: 'Métodos de bisección, Newton-Raphson y punto fijo.',
      image:
        'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '5 de abril, 2025',
    },
    {
      title: 'Actualización de la plataforma',
      summary: 'Nuevas herramientas de visualización de algoritmos.',
      image:
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '1 de abril, 2025',
    },
  ];
}
