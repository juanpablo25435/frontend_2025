import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkMunicipality } from '../models/work-municipality.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkMunicipalityService {
  constructor(private http: HttpClient) { }

  list(): Observable<WorkMunicipality[]> {
    return this.http.get<WorkMunicipality[]>(`${environment.url_ms_cinema}/work-municipalities`);
  }

  view(id: number): Observable<WorkMunicipality> {
    return this.http.get<WorkMunicipality>(`${environment.url_ms_cinema}/work-municipalities/${id}`);
  }

  create(newWorkMunicipality: WorkMunicipality): Observable<WorkMunicipality> {
    return this.http.post<WorkMunicipality>(`${environment.url_ms_cinema}/work-municipalities`, newWorkMunicipality);
  }

  update(theWorkMunicipality: WorkMunicipality): Observable<WorkMunicipality> {
    return this.http.put<WorkMunicipality>(`${environment.url_ms_cinema}/work-municipalities/${theWorkMunicipality.id}`, theWorkMunicipality);
  }

  delete(id: number): Observable<WorkMunicipality> {
    return this.http.delete<WorkMunicipality>(`${environment.url_ms_cinema}/work-municipalities/${id}`);
  }
}