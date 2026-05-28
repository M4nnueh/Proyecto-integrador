import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { DashboardEstudianteComponent } from './dashboard-estudiante';
import { AuthService } from '../services/auth.service';
import { EstudianteService } from '../services/estudiante.service';

describe('DashboardEstudianteComponent', () => {
  let component: DashboardEstudianteComponent;
  let fixture: ComponentFixture<DashboardEstudianteComponent>;

  const authMock = {
    authReady$: of(true),
    currentUser$: new BehaviorSubject({ id: 1, nombre: 'Estudiante', email: 'estudiante@test.com', rol: 'estudiante' }),
    getCurrentUser: () => ({ id: 1, nombre: 'Estudiante', email: 'estudiante@test.com', rol: 'estudiante' }),
    logout: () => undefined
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEstudianteComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authMock },
        { provide: EstudianteService, useValue: { getCursos: () => of({ success: true, cursos: [] }) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
