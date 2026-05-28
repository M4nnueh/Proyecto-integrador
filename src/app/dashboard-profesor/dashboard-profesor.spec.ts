import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardProfesorComponent } from './dashboard-profesor';
import { AuthService } from '../services/auth.service';
import { ProfesorService } from '../services/profesor.service';

describe('DashboardProfesor', () => {
  let component: DashboardProfesorComponent;
  let fixture: ComponentFixture<DashboardProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProfesorComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            authReady$: of(true),
            currentUser$: of({ id: 1, nombre: 'Profesor', email: 'profesor@test.com', rol: 'profesor' }),
            getDashboardRoute: () => '/dashboard/profesor',
            logout: () => undefined
          }
        },
        {
          provide: ProfesorService,
          useValue: {
            getDashboardStats: () => of({
              success: true,
              stats: {
                cursosImpartidos: 0,
                alumnosActivos: 0,
                evaluacionesPendientes: 0,
                promedioGeneral: 0,
                rendimientoPorUnidad: []
              }
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
