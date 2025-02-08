import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CalculatorService } from '../../core/services/calculator.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-900">
      <!-- Navigation -->
      <nav class="bg-gray-800 shadow-lg border-b border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-white">Calculator Dashboard</h1>
            </div>
            <div class="flex items-center">
              <div class="flex items-center mr-4" *ngIf="authService.user$ | async as user">
                <img 
                  [src]="user.photoURL" 
                  [alt]="user.displayName + ' avatar'"
                  class="w-8 h-8 rounded-full object-cover border-2 border-blue-400 mr-3"
                >
                <span class="text-gray-200">{{ user.displayName }}</span>
              </div>
              <button
                (click)="signOut()"
                class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Calculator -->
      <div class="max-w-md mx-auto mt-10">
        <div class="bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-4">
          <div class="mb-4">
            <input
              type="text"
              [(ngModel)]="display"
              readonly
              class="w-full p-4 text-right text-2xl border-0 rounded-xl bg-gray-700 text-white shadow-inner"
            />
          </div>

          <div class="grid grid-cols-4 gap-3">
            <!-- First row -->
            <button 
              (click)="clear()" 
              class="col-span-2 p-4 text-xl font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              C
            </button>
            <button 
              (click)="appendOperator('/')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              /
            </button>
            <button 
              (click)="appendOperator('*')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              ×
            </button>

            <!-- Number pad and operators -->
            <button 
              (click)="appendNumber('7')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              7
            </button>
            <button 
              (click)="appendNumber('8')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              8
            </button>
            <button 
              (click)="appendNumber('9')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              9
            </button>
            <button 
              (click)="appendOperator('-')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              -
            </button>

            <button 
              (click)="appendNumber('4')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              4
            </button>
            <button 
              (click)="appendNumber('5')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              5
            </button>
            <button 
              (click)="appendNumber('6')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              6
            </button>
            <button 
              (click)="appendOperator('+')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              +
            </button>

            <button 
              (click)="appendNumber('1')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              1
            </button>
            <button 
              (click)="appendNumber('2')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              2
            </button>
            <button 
              (click)="appendNumber('3')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              3
            </button>
            <button 
              (click)="calculate()" 
              class="row-span-2 p-4 text-xl font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-all duration-200"
            >
              =
            </button>

            <button 
              (click)="appendNumber('0')" 
              class="col-span-2 p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              0
            </button>
            <button 
              (click)="appendNumber('.')" 
              class="p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              .
            </button>
          </div>

          <!-- Error message -->
          <div *ngIf="error" class="mt-4 text-red-400 text-sm">
            {{ error }}
          </div>

          <!-- Loading indicator -->
          <div *ngIf="loading" class="mt-4 text-center text-blue-400">
            Calculating...
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent {
  protected authService = inject(AuthService);
  private calculatorService = inject(CalculatorService);

  display = '';
  error = '';
  loading = false;

  appendNumber(num: string): void {
    this.error = '';
    this.display += num;
  }

  appendOperator(operator: string): void {
    this.error = '';
    if (this.display && !this.isOperator(this.display[this.display.length - 1])) {
      this.display += operator;
    }
  }

  clear(): void {
    this.display = '';
    this.error = '';
  }

  calculate(): void {
    if (!this.display) return;

    this.loading = true;
    this.error = '';

    this.calculatorService.calculate(this.display).subscribe({
      next: (result) => {
        this.display = result.result.toString();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'An error occurred';
        this.loading = false;
      }
    });
  }

  private isOperator(char: string): boolean {
    return ['+', '-', '*', '/'].includes(char);
  }

  async signOut(): Promise<void> {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
