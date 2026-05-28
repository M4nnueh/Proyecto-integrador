import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Temas } from './temas';
import { AuthService } from '../services/auth.service';

describe('Temas', () => {
  let component: Temas;
  let fixture: ComponentFixture<Temas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Temas],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { getCurrentUser: () => null, currentUser$: of(null), logout: () => undefined } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Temas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
