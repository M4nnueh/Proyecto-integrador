import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const estudianteGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getCurrentUser();

  if (user && user.rol === 'estudiante') {
    return true;
  }

  router.navigate(['/home']);
  return false;
};