import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  photoURL: string | null;
  displayName: string | null;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-gray-800 shadow-lg border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-white">{{ title }}</h1>
          </div>
          <div class="flex items-center">
            <div class="flex items-center mr-4" *ngIf="user?.displayName">
              <img 
                [src]="user?.photoURL || '/assets/default-avatar.png'" 
                [alt]="(user?.displayName || 'User') + ' avatar'"
                class="w-8 h-8 rounded-full object-cover border-2 border-blue-400 mr-3"
              >
              <span class="text-gray-200">{{ user?.displayName }}</span>
            </div>
            <button
              (click)="onSignOut.emit()"
              class="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavBarComponent {
  @Input() title: string = '';
  @Input() user: User | null = null;
  @Output() onSignOut = new EventEmitter<void>();
}
