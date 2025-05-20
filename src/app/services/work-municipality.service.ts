import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WorkMunicipality } from '../models/work-municipality.model'; // Asegúrate de crear este modelo

@Injectable({
  providedIn: 'root'
})
export class WorkMunicipalityService {
  constructor(private http: HttpClient) { }

  list(): Observable<WorkMunicipality[]> {
    return this.http.get<WorkMunicipality[]>(`${environment.url_ms_cinema}/work_municipalities`);
  }

  view(id: number): Observable<WorkMunicipality> {
    return this.http.get<WorkMunicipality>(`${environment.url_ms_cinema}/work_municipalities/${id}`);
  }

  create(newWorkMunicipality: WorkMunicipality): Observable<WorkMunicipality> {
    return this.http.post<WorkMunicipality>(
      `${environment.url_ms_cinema}/work_municipalities`,
      newWorkMunicipality
    );
  }

  update(theWorkMunicipality: WorkMunicipality): Observable<WorkMunicipality> {
    return this.http.put<WorkMunicipality>(
      `${environment.url_ms_cinema}/work_municipalities/${theWorkMunicipality.id}`,
      theWorkMunicipality
    );
  }

  delete(id: number): Observable<WorkMunicipality> {
    return this.http.delete<WorkMunicipality>(`${environment.url_ms_cinema}/work_municipalities/${id}`);
  }
}
