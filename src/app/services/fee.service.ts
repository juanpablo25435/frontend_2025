import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fee } from '../models/fee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  constructor(private http: HttpClient) {}

  list(): Observable<Fee[]> {
    return this.http.get<Fee[]>(`${environment.url_ms_cinema}/fees`);
  }

  view(id: number): Observable<Fee> {
    return this.http.get<Fee>(`${environment.url_ms_cinema}/fees/${id}`);
  }

  create(newFee: Fee): Observable<Fee> {
    return this.http.post<Fee>(`${environment.url_ms_cinema}/fees`, newFee);
  }

  update(theFee: Fee): Observable<Fee> {
    return this.http.put<Fee>(`${environment.url_ms_cinema}/fees/${theFee.id}`, theFee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url_ms_cinema}/fees/${id}`);
  }
}
