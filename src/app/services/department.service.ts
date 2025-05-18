import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
      constructor(private http: HttpClient) { }
      list(): Observable<Department[]> {
        return this.http.get<Department[]>(`${environment.url_ms_cinema}/departments`);
      }

      view(id: number): Observable<Department> {
      return this.http.get<Department>(`${environment.url_ms_cinema}/departments/${id}`);
      }

      create(newDepartment: Department): Observable<Department> {
        return this.http.post<Department>(`${environment.url_ms_cinema}/departments`, newDepartment);
      }

      update(theDepartment: Department): Observable<Department> {
        return this.http.put<Department>(`${environment.url_ms_cinema}/departments/${theDepartment.id}`, theDepartment);
      }

      delete(id: number) {
        return this.http.delete<Department>(`${environment.url_ms_cinema}/departments/${id}`);
      }
}
