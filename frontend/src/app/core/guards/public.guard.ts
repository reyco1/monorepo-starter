import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.user$.pipe(
    map(user => {
      if (user) {
        // If user is authenticated, redirect to dashboard
        router.navigate(['/dashboard']);
        return false;
      }
      // Allow access to public routes if not authenticated
      return true;
    })
  );
};
