import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calc-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClass"
      (click)="onClick()"
      [disabled]="disabled"
      type="button">
      {{ label }}
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    button {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0.375rem;
      font-size: 1.25rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    button:hover:not(:disabled) {
      opacity: 0.8;
    }
    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `]
})
export class CalcButtonComponent {
  @Input() label: string = '';
  @Input() buttonClass: string = 'bg-blue-500 text-white p-4';
  @Input() disabled: boolean = false;
  @Output() btnClick = new EventEmitter<void>();

  onClick(): void {
    this.btnClick.emit();
  }
}
