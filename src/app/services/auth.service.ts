import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { authConfig } from '../auth/auth.config';

export interface User {
  id?: number;
  nombre: string;
  email: string;
  rol: 'estudiante' | 'profesor' | 'administrador' | '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private authReadySubject = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:8080/api/auth';

  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  public authReady$: Observable<boolean> = this.authReadySubject.asObservable();

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient
  ) {
    this.configure();
  }

  private configure(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (this.isLoggedIn()) {
          this.refreshCurrentUser(true);
        } else {
          this.authReadySubject.next(true);
        }
      })
      .catch(() => this.authReadySubject.next(true));

    this.oauthService.events.subscribe(e => {
      if (e.type === 'token_received') {
        this.ngZone.run(() => {
          this.refreshCurrentUser(true);
        });
      }
    });
  }

  private redirectToDashboard(): void {
    if (this.shouldRedirectAfterLogin()) {
      this.navigateToCurrentUserDashboard();
    }
  }

  public navigateToCurrentUserDashboard(): void {
    const user = this.currentUserSubject.value || this.getCurrentUser();
    const dashboardRoute = this.getDashboardRoute(user);

    if (dashboardRoute && this.router.url !== dashboardRoute) {
      this.router.navigateByUrl(dashboardRoute, { replaceUrl: true });
    }
  }

  public getDashboardRoute(user: User | null): string | null {
    switch (user?.rol) {
      case 'estudiante':
        return '/dashboard/estudiante';
      case 'profesor':
        return '/dashboard/profesor';
      case 'administrador':
        return '/dashboard/admin';
      default:
        return null;
    }
  }

  public login(): void {
    this.oauthService.initCodeFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
    this.currentUserSubject.next(null);
    this.authReadySubject.next(true);
  }

  public isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public getCurrentUser(): User | null {
    if (!this.isLoggedIn()) {
      return null;
    }

    const claims = this.oauthService.getIdentityClaims() as any;
    const tokenPayload = this.getAccessTokenPayload();
    const source = claims || tokenPayload;
    if (!source) return null;

    return {
      nombre: source.name || source.preferred_username || source.email || 'Usuario',
      email: source.email || '',
      rol: this.extractRole(source, tokenPayload) as User['rol']
    };
  }

  private refreshCurrentUser(redirectAfter = false): void {
    const tokenUser = this.getCurrentUser();
    this.currentUserSubject.next(tokenUser);

    this.syncCurrentUserWithBackend().subscribe(user => {
      if (user) {
        this.currentUserSubject.next(user);
      }
      if (redirectAfter) {
        this.redirectToDashboard();
      }
      this.authReadySubject.next(true);
    });
  }

  private syncCurrentUserWithBackend(): Observable<User | null> {
    if (!this.isLoggedIn()) {
      return of(null);
    }

    return this.http.get<{ success: boolean; user: User }>(`${this.apiUrl}/me`).pipe(
      map(response => response.success ? response.user : this.getCurrentUser()),
      catchError(err => {
        console.warn('No se pudo sincronizar el usuario con el backend', err);
        return of(this.getCurrentUser());
      })
    );
  }

  private getAccessTokenPayload(): any | null {
    try {
      const token = this.oauthService.getAccessToken();
      if (!token) return null;
      const payload = token.split('.')[1];
      const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
      const paddedPayload = normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=');
      return JSON.parse(atob(paddedPayload));
    } catch (e) {
      console.warn('Could not decode access token', e);
      return null;
    }
  }

  private shouldRedirectAfterLogin(): boolean {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    const path = `/${tree.root.children['primary']?.segments.map(segment => segment.path).join('/') || ''}`;
    const hasAuthCallbackParams = Boolean(tree.queryParams['code'] || tree.queryParams['state']);

    return hasAuthCallbackParams || path === '/' || path === '/home' || path === '/login';
  }

  private extractRole(claims: any, tokenPayload: any | null): string {
    const roles = new Set<string>();
    const addRoles = (items?: string[]) => {
      (items || []).forEach(role => roles.add(role.toLowerCase().replace(/^role_/, '')));
    };

    addRoles(claims?.realm_access?.roles);
    addRoles(tokenPayload?.realm_access?.roles);

    const resourceAccess = tokenPayload?.resource_access || claims?.resource_access;
    addRoles(resourceAccess?.[authConfig.clientId || '']?.roles);

    if (roles.has('administrador') || roles.has('admin')) return 'administrador';
    if (roles.has('profesor')) return 'profesor';
    if (roles.has('estudiante')) return 'estudiante';
    return '';
  }
}
