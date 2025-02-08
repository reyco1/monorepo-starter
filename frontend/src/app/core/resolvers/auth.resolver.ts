import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const authService = inject(AuthService);
  
  // Wait for the initial auth state to be determined
  return authService.isAuthenticated$.pipe(
    first(authenticated => authenticated !== null) // Only complete when we have a definitive true/false
  );
};
