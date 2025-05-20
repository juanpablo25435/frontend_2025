import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaintenanceProcedure } from '../models/maintenance-procedure.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceProcedureService {
  constructor(private http: HttpClient) { }

  list(): Observable<MaintenanceProcedure[]> {
    return this.http.get<MaintenanceProcedure[]>(`${environment.url_ms_cinema}/maintenance_procedures`);
  }

  view(id: number): Observable<MaintenanceProcedure> {
    return this.http.get<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedures/${id}`);
  }

  create(newMaintenanceProcedure: MaintenanceProcedure): Observable<MaintenanceProcedure> {
    return this.http.post<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedures`, newMaintenanceProcedure);
  }

  update(theMaintenanceProcedure: MaintenanceProcedure): Observable<MaintenanceProcedure> {
    return this.http.put<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedures/${theMaintenanceProcedure.id}`, theMaintenanceProcedure);
  }

  delete(id: number): Observable<MaintenanceProcedure> {
    return this.http.delete<MaintenanceProcedure>(`${environment.url_ms_cinema}/maintenance_procedures/${id}`);
  }
}
