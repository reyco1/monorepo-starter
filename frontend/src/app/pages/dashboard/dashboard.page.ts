import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { CalculatorComponent } from '../../features/calculator/calculator.component';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, CalculatorComponent, NavBarComponent],
  template: `
    <div class="min-h-screen bg-gray-900">
      <app-nav-bar
        title="Calculator Dashboard"
        [user]="authService.user$ | async"
        (onSignOut)="signOut()"
      />

      <!-- Calculator -->
      <div class="max-w-md mx-auto mt-10">
        <app-calculator />
      </div>
    </div>
  `,
  styles: []
})
export class DashboardPage {
  protected authService = inject(AuthService);

  async signOut(): Promise<void> {
    await this.authService.signOut();
  }
}
