import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalcButtonComponent } from './components/calc-button/calc-button.component';
import { CalculatorService } from '../../../core/services/calculator.service';
import { firstValueFrom } from 'rxjs';

interface CalcButton {
  label: string;
  action: () => void;
  class?: string;
  buttonClass: string;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, CalcButtonComponent],
  template: `
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
        <app-calc-button
          *ngFor="let button of calculatorButtons"
          [label]="button.label"
          [buttonClass]="button.buttonClass"
          [class]="button.class || ''"
          (btnClick)="button.action()"
        />
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
  `,
  styles: []
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  display = '0';
  error = '';
  loading = false;
  readonly MAX_LENGTH = 16;

  private readonly numberClass = "p-4 text-xl font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 transition-colors duration-200";
  private readonly operatorClass = "p-4 text-xl font-medium rounded-xl text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-colors duration-200";

  calculatorButtons: CalcButton[] = [
    {
      label: 'C',
      action: () => this.clear(),
      class: 'col-span-2',
      buttonClass: "col-span-2 p-4 text-xl font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800 transition-colors duration-200"
    },
    {
      label: '/',
      action: () => this.appendOperator('/'),
      buttonClass: this.operatorClass
    },
    {
      label: '×',
      action: () => this.appendOperator('*'),
      buttonClass: this.operatorClass
    },
    {
      label: '7',
      action: () => this.appendNumber('7'),
      buttonClass: this.numberClass
    },
    {
      label: '8',
      action: () => this.appendNumber('8'),
      buttonClass: this.numberClass
    },
    {
      label: '9',
      action: () => this.appendNumber('9'),
      buttonClass: this.numberClass
    },
    {
      label: '-',
      action: () => this.appendOperator('-'),
      buttonClass: this.operatorClass
    },
    {
      label: '4',
      action: () => this.appendNumber('4'),
      buttonClass: this.numberClass
    },
    {
      label: '5',
      action: () => this.appendNumber('5'),
      buttonClass: this.numberClass
    },
    {
      label: '6',
      action: () => this.appendNumber('6'),
      buttonClass: this.numberClass
    },
    {
      label: '+',
      action: () => this.appendOperator('+'),
      buttonClass: this.operatorClass
    },
    {
      label: '1',
      action: () => this.appendNumber('1'),
      buttonClass: this.numberClass
    },
    {
      label: '2',
      action: () => this.appendNumber('2'),
      buttonClass: this.numberClass
    },
    {
      label: '3',
      action: () => this.appendNumber('3'),
      buttonClass: this.numberClass
    },
    {
      label: '=',
      action: () => this.calculate(),
      class: 'row-span-2',
      buttonClass: "row-span-2 p-4 text-xl font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-800 transition-all duration-200"
    },
    {
      label: '0',
      action: () => this.appendNumber('0'),
      class: 'col-span-2',
      buttonClass: this.numberClass
    },
    {
      label: '.',
      action: () => this.appendDecimal(),
      buttonClass: this.numberClass
    }
  ];

  appendNumber(num: string): void {
    this.error = '';
    if (this.display.length >= this.MAX_LENGTH) return;
    
    if (this.display === '0') {
      this.display = num;
    } else {
      this.display += num;
    }
  }

  appendOperator(operator: string): void {
    this.error = '';
    const lastChar = this.display[this.display.length - 1];
    
    if (['+', '-', '*', '/'].includes(lastChar)) {
      this.display = this.display.slice(0, -1) + operator;
    } else {
      this.display += operator;
    }
  }

  appendDecimal(): void {
    this.error = '';
    const lastNumber = this.display.split(/[-+*/]/).pop() || '';
    
    if (!lastNumber.includes('.')) {
      this.display += '.';
    }
  }

  clear(): void {
    this.display = '0';
    this.error = '';
  }

  async calculate(): Promise<void> {
    try {
      this.error = '';
      this.loading = true;
      const response = await firstValueFrom(this.calculatorService.calculate(this.display));
      this.display = response.result.toString();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      this.loading = false;
    }
  }
}
