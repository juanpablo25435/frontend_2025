import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from '../models/policy.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  constructor(private http: HttpClient) { }

  list(): Observable<Policy[]> {
    return this.http.get<Policy[]>(`${environment.url_ms_cinema}/policies`);
  }

  view(id: number): Observable<Policy> {
    return this.http.get<Policy>(`${environment.url_ms_cinema}/policies/${id}`);
  }

  create(newPolicy: Policy): Observable<Policy> {
    return this.http.post<Policy>(`${environment.url_ms_cinema}/policies`, newPolicy);
  }

  update(thePolicy: Policy): Observable<Policy> {
    return this.http.put<Policy>(`${environment.url_ms_cinema}/policies/${thePolicy.id}`, thePolicy);
  }

  delete(id: number): Observable<Policy> {
    return this.http.delete<Policy>(`${environment.url_ms_cinema}/policies/${id}`);
  }
}