import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialty } from '../models/specialty.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor(private http: HttpClient) { }

  list(): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${environment.url_ms_cinema}/specialties`);
  }

  view(id: number): Observable<Specialty> {
    return this.http.get<Specialty>(`${environment.url_ms_cinema}/specialties/${id}`);
  }

  create(newSpecialty: Specialty): Observable<Specialty> {
    return this.http.post<Specialty>(`${environment.url_ms_cinema}/specialties`, newSpecialty);
  }

  update(theSpecialty: Specialty): Observable<Specialty> {
    return this.http.put<Specialty>(`${environment.url_ms_cinema}/specialties/${theSpecialty.id}`, theSpecialty);
  }

  delete(id: number): Observable<Specialty> {
    return this.http.delete<Specialty>(`${environment.url_ms_cinema}/specialties/${id}`);
  }
}