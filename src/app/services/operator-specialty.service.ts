import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperatorSpecialty } from '../models/operator-specialty.model';

@Injectable({
  providedIn: 'root'
})
export class OperatorSpecialtyService {
  constructor(private http: HttpClient) {}

  list(): Observable<OperatorSpecialty[]> {
    return this.http.get<OperatorSpecialty[]>(`${environment.url_ms_cinema}/operator_specialties`);
  }

  view(id: number): Observable<OperatorSpecialty> {
    return this.http.get<OperatorSpecialty>(`${environment.url_ms_cinema}/operator_specialties/${id}`);
  }

  create(newOperatorSpecialty: OperatorSpecialty): Observable<OperatorSpecialty> {
    return this.http.post<OperatorSpecialty>(`${environment.url_ms_cinema}/operator_specialties`, newOperatorSpecialty);
  }

  update(theOperatorSpecialty: OperatorSpecialty): Observable<OperatorSpecialty> {
    return this.http.put<OperatorSpecialty>(
      `${environment.url_ms_cinema}/operator_specialties/${theOperatorSpecialty.id}`,
      theOperatorSpecialty
    );
  }

  delete(id: number): Observable<OperatorSpecialty> {
    return this.http.delete<OperatorSpecialty>(`${environment.url_ms_cinema}/operator_specialties/${id}`);
  }
}
