import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http: HttpClient) { }

  list(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.url_ms_cinema}/services`);
  }

  view(id: number): Observable<Service> {
    return this.http.get<Service>(`${environment.url_ms_cinema}/services/${id}`);
  }

  create(newService: Service): Observable<Service> {
    return this.http.post<Service>(`${environment.url_ms_cinema}/services`, newService);
  }

  update(theService: Service): Observable<Service> {
    return this.http.put<Service>(`${environment.url_ms_cinema}/services/${theService.id}`, theService);
  }

  delete(id: number): Observable<Service> {
    return this.http.delete<Service>(`${environment.url_ms_cinema}/services/${id}`);
  }
}
