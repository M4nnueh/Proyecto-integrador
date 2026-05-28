import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login';
import { AuthService } from '../services/auth.service';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            authReady$: of(true),
            currentUser$: of(null),
            isLoggedIn: () => false,
            navigateToCurrentUserDashboard: () => undefined,
            login: () => undefined,
            logout: () => undefined
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
