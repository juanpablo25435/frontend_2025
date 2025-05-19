import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Governor } from '../models/governor.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GovernorService {
  constructor(private http: HttpClient) {}

  list(): Observable<Governor[]> {
    return this.http.get<Governor[]>(`${environment.url_ms_cinema}/governors`);
  }

  view(id: number): Observable<Governor> {
    return this.http.get<Governor>(`${environment.url_ms_cinema}/governors/${id}`);
  }

  create(newGovernor: Governor): Observable<Governor> {
    return this.http.post<Governor>(`${environment.url_ms_cinema}/governors`, newGovernor);
  }

  update(theGovernor: Governor): Observable<Governor> {
    return this.http.put<Governor>(`${environment.url_ms_cinema}/governors/${theGovernor.id}`, theGovernor);
  }

  delete(id: number): Observable<Governor> {
    return this.http.delete<Governor>(`${environment.url_ms_cinema}/governors/${id}`);
  }
}
