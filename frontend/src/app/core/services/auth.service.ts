import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  User,
  signInWithPopup,
  signOut,
  authState
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  isAuthenticated$: Observable<boolean> = authState(this.auth).pipe(
    map(user => !!user)
  );

  constructor() {
    // Subscribe to auth state changes
    authState(this.auth).subscribe(user => {
      this.userSubject.next(user);
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      // Navigation is handled in the authState subscription
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      // Navigation is handled in the authState subscription
    } catch (error) {
      console.error('Sign out failed:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
