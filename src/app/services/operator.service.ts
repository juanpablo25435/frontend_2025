import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operator } from '../models/operator.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  private baseUrl = `${environment.url_ms_cinema}/operators`;

  constructor(private http: HttpClient) { }

  list(): Observable<Operator[]> {
    return this.http.get<Operator[]>(this.baseUrl);
  }

  view(id: number): Observable<Operator> {
    return this.http.get<Operator>(`${this.baseUrl}/${id}`);
  }

  create(newOperator: Operator): Observable<Operator> {
    return this.http.post<Operator>(this.baseUrl, newOperator);
  }

  update(theOperator: Operator): Observable<Operator> {
    return this.http.put<Operator>(`${this.baseUrl}/${theOperator.id}`, theOperator);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
