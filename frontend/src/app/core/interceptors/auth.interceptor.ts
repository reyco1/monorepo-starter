import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  // Only intercept requests to our API
  if (!req.url.includes('api/v1')) {
    return next(req);
  }

  // Get the current user's token
  const user = auth.currentUser;
  if (!user) {
    return next(req);
  }

  // Get the token and add it to the request
  return from(user.getIdToken()).pipe(
    switchMap(token => {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(authReq);
    })
  );
};
