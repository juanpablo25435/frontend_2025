import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Procedure } from '../models/procedure.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  constructor(private http: HttpClient) { }

  list(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${environment.url_ms_cinema}/procedures`);
  }

  view(id: number): Observable<Procedure> {
    return this.http.get<Procedure>(`${environment.url_ms_cinema}/procedures/${id}`);
  }

  create(newProcedure: Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(`${environment.url_ms_cinema}/procedures`, newProcedure);
  }

  update(theProcedure: Procedure): Observable<Procedure> {
    return this.http.put<Procedure>(`${environment.url_ms_cinema}/procedures/${theProcedure.id}`, theProcedure);
  }

  delete(id: number): Observable<Procedure> {
    return this.http.delete<Procedure>(`${environment.url_ms_cinema}/procedures/${id}`);
  }
}