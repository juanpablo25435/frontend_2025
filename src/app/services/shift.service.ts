import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shift } from '../models/shift.model';  // Asegúrate de crear este modelo
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  constructor(private http: HttpClient) { }

  list(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${environment.url_ms_cinema}/shifts`);
  }

  view(id: number): Observable<Shift> {
    return this.http.get<Shift>(`${environment.url_ms_cinema}/shifts/${id}`);
  }

  create(newShift: Shift): Observable<Shift> {
    return this.http.post<Shift>(`${environment.url_ms_cinema}/shifts`, newShift);
  }

  update(theShift: Shift): Observable<Shift> {
    return this.http.put<Shift>(`${environment.url_ms_cinema}/shifts/${theShift.id}`, theShift);
  }

  delete(id: number): Observable<Shift> {
    return this.http.delete<Shift>(`${environment.url_ms_cinema}/shifts/${id}`);
  }
}
