import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpareProcedure } from '../models/spare-procedure.model'; // Crea este modelo

@Injectable({
  providedIn: 'root'
})
export class SpareProcedureService {
  constructor(private http: HttpClient) { }

  list(): Observable<SpareProcedure[]> {
    return this.http.get<SpareProcedure[]>(`${environment.url_ms_cinema}/spare_procedures`);
  }

  view(id: number): Observable<SpareProcedure> {
    return this.http.get<SpareProcedure>(`${environment.url_ms_cinema}/spare_procedures/${id}`);
  }

  create(newSpareProcedure: SpareProcedure): Observable<SpareProcedure> {
    return this.http.post<SpareProcedure>(`${environment.url_ms_cinema}/spare_procedures`, newSpareProcedure);
  }

  update(theSpareProcedure: SpareProcedure): Observable<SpareProcedure> {
    return this.http.put<SpareProcedure>(
      `${environment.url_ms_cinema}/spare_procedures/${theSpareProcedure.id}`,
      theSpareProcedure
    );
  }

  delete(id: number): Observable<SpareProcedure> {
    return this.http.delete<SpareProcedure>(`${environment.url_ms_cinema}/spare_procedures/${id}`);
  }
}
