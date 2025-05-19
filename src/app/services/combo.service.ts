import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  constructor(private http: HttpClient) { }

  list(): Observable<Combo[]> {
    return this.http.get<Combo[]>(`${environment.url_ms_cinema}/combos`);
  }

  view(id: number): Observable<Combo> {
    return this.http.get<Combo>(`${environment.url_ms_cinema}/combos/${id}`);
  }

  create(newCombo: Combo): Observable<Combo> {
    return this.http.post<Combo>(`${environment.url_ms_cinema}/combos`, newCombo);
  }

  update(theCombo: Combo): Observable<Combo> {
    return this.http.put<Combo>(`${environment.url_ms_cinema}/combos/${theCombo.id}`, theCombo);
  }

  delete(id: number): Observable<Combo> {
    return this.http.delete<Combo>(`${environment.url_ms_cinema}/combos/${id}`);
  }
}
