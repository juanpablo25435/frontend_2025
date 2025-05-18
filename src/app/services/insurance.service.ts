import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Insurance } from '../models/insurance.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  constructor(private http: HttpClient) { }

  list(): Observable<Insurance[]> {
    return this.http.get<Insurance[]>(`${environment.url_ms_cinema}/insurances`);
  }

  view(id: number): Observable<Insurance> {
    return this.http.get<Insurance>(`${environment.url_ms_cinema}/insurances/${id}`);
  }

  create(newInsurance: Insurance): Observable<Insurance> {
    return this.http.post<Insurance>(`${environment.url_ms_cinema}/insurances`, newInsurance);
  }

  update(theInsurance: Insurance): Observable<Insurance> {
    return this.http.put<Insurance>(
      `${environment.url_ms_cinema}/insurances/${theInsurance.id}`, 
      theInsurance
    );
  }

  delete(id: number): Observable<Insurance> {
    return this.http.delete<Insurance>(`${environment.url_ms_cinema}/insurances/${id}`);
  }
}