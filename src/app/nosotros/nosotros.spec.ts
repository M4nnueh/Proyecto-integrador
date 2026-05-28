import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { NosotrosComponent } from './nosotros';
import { AuthService } from '../services/auth.service';

describe('Nosotros', () => {
  let component: NosotrosComponent;
  let fixture: ComponentFixture<NosotrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosotrosComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { currentUser$: of(null), logout: () => undefined } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NosotrosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
