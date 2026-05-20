import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './nosotros.html',
  styleUrls: ['./nosotros.css'],
})
export class NosotrosComponent {
  // Lista de desarrolladores
  developers = [
    {
      name: 'Cristian Alfonso Hoyos Gomez',
      id: '230241038',
      email: 'cristian.hoyos01@uceva.edu.co',
    },
    {
      name: 'Kevin David Casilimas R',
      id: '230221039',
      email: 'kevin.casilimas01@uceva.edu.co',
    },
    {
      name: 'Manuel Alejandro Ramirez',
      id: '230231050',
      email: 'Manue.ramirez01@uceva.edu.co',
    },
    { name: 'Jimy Fabian Ramirez T', id: '', email: '' },
    { name: 'Valentina Gonzalez Mejia', id: '', email: '' },
    { name: 'David Valencia Bravo', id: '', email: '' },
  ];
}
