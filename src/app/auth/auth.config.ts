import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // URL base del realm de Keycloak.
  issuer: 'http://localhost:8090/realms/curso-springboot',
  
  // Adónde redirige Keycloak después del login.
  redirectUri: window.location.origin,
  
  // El client Angular creado en Keycloak
  clientId: 'angular-client',
  
  // 'code' activa el flujo Authorization Code (con PKCE automático)
  responseType: 'code',
  
  // openid: requerido para OIDC (emite id_token con info del usuario)
  scope: 'openid profile email',
  
  // Solo para desarrollo
  requireHttps: false,
  showDebugInformation: true,
};
