import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceType } from '../models/service-type.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
  constructor(private http: HttpClient) { }

  list(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(`${environment.url_ms_cinema}/services-types`);
  }

  view(id: number): Observable<ServiceType> {
    return this.http.get<ServiceType>(`${environment.url_ms_cinema}/services-types/${id}`);
  }

  create(newServiceType: ServiceType): Observable<ServiceType> {
    return this.http.post<ServiceType>(`${environment.url_ms_cinema}/services-types`, newServiceType);
  }

  update(theServiceType: ServiceType): Observable<ServiceType> {
    return this.http.put<ServiceType>(
      `${environment.url_ms_cinema}/services-types/${theServiceType.id}`, 
      theServiceType
    );
  }

  delete(id: number): Observable<ServiceType> {
    return this.http.delete<ServiceType>(`${environment.url_ms_cinema}/services-types/${id}`);
  }
}
