import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'estudiante' | 'profesor' | 'administrador';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const userStr = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(userStr ? JSON.parse(userStr) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        if (response.success && response.user) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  register(nombre: string, email: string, password: string, rol: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, { nombre, email, password, rol });
  }
}
