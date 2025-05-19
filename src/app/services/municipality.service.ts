import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Municipality } from 'src/app/models/municipality.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private http: HttpClient) { }

  list(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${environment.url_ms_cinema}/municipalities`);
  }

  view(id: number): Observable<Municipality> {
    return this.http.get<Municipality>(`${environment.url_ms_cinema}/municipalities/${id}`);
  }

  create(newMunicipality: Municipality): Observable<Municipality> {
    return this.http.post<Municipality>(`${environment.url_ms_cinema}/municipalities`, newMunicipality);
  }

  update(theMunicipality: Municipality): Observable<Municipality> {
    return this.http.put<Municipality>(
      `${environment.url_ms_cinema}/municipalities/${theMunicipality.id}`,
      theMunicipality
    );
  }

  delete(id: number): Observable<Municipality> {
    return this.http.delete<Municipality>(`${environment.url_ms_cinema}/municipalities/${id}`);
  }
}
