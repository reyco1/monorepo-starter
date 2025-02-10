import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-900 flex items-center justify-center">
      <div class="max-w-md w-full mx-auto">
        <div class="bg-gray-800 shadow-lg rounded-lg px-8 py-10 text-center">
          <h2 class="text-3xl font-bold text-white mb-8">Welcome Back</h2>
          
          <button
            (click)="signInWithGoogle()"
            class="w-full bg-white text-gray-900 px-4 py-3 rounded-lg font-medium flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800"
          >
            <img
              src="assets/google.png"
              alt="Google logo"
              class="w-6 h-6 mr-3"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginPage {
  private authService = inject(AuthService);

  async signInWithGoogle(): Promise<void> {
    await this.authService.signInWithGoogle();
  }
}
