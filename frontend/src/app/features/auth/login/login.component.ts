import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto bg-blue-500 rounded-2xl flex items-center justify-center mb-8">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p class="mt-2 text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>

        <div class="mt-8">
          <button
            (click)="signInWithGoogle()"
            class="group relative w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <!-- Google Icon -->
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <!-- Error message -->
        <div *ngIf="error" class="mt-4 text-center text-sm text-red-500">
          {{ error }}
        </div>

        <!-- Loading state -->
        <div *ngIf="loading" class="mt-4 text-center text-sm text-blue-400">
          Connecting to Google...
        </div>

        <div class="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our
          <a href="#" class="text-blue-400 hover:text-blue-300">Terms of Service</a>
          and
          <a href="#" class="text-blue-400 hover:text-blue-300">Privacy Policy</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  error = '';
  loading = false;

  async signInWithGoogle(): Promise<void> {
    try {
      this.loading = true;
      this.error = '';
      await this.authService.signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
      this.error = 'Failed to sign in with Google. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
