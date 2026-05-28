import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardAdminComponent } from './dashboard-admin';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

describe('DashboardAdmin', () => {
  let component: DashboardAdminComponent;
  let fixture: ComponentFixture<DashboardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdminComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            authReady$: of(true),
            currentUser$: of({ id: 1, nombre: 'Admin', email: 'admin@test.com', rol: 'administrador' }),
            getDashboardRoute: () => '/dashboard/admin',
            logout: () => undefined
          }
        },
        {
          provide: AdminService,
          useValue: {
            getDashboardStats: () => of({
              success: true,
              stats: {
                totalUsuarios: 0,
                totalEstudiantes: 0,
                totalProfesores: 0,
                totalAdmins: 0,
                ultimosUsuarios: []
              }
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
