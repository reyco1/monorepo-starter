import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};
