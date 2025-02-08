import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CalculationResult {
  result: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = `${environment.apiUrl}/calculate`;

  constructor(private http: HttpClient) {}

  calculate(expression: string): Observable<CalculationResult> {
    return this.http.get<CalculationResult>(this.apiUrl, {
      params: { expression }
    });
  }
}
