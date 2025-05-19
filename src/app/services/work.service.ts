import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Work } from '../models/work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  constructor(private http: HttpClient) { }

  list(): Observable<Work[]> {
    return this.http.get<Work[]>(`${environment.url_ms_cinema}/works`);
  }

  view(id: number): Observable<Work> {
    return this.http.get<Work>(`${environment.url_ms_cinema}/works/${id}`);
  }

  create(newWork: Work): Observable<Work> {
    return this.http.post<Work>(`${environment.url_ms_cinema}/works`, newWork);
  }

  update(theWork: Work): Observable<Work> {
    return this.http.put<Work>(
      `${environment.url_ms_cinema}/works/${theWork.id}`,
      theWork
    );
  }

  delete(id: number): Observable<Work> {
    return this.http.delete<Work>(`${environment.url_ms_cinema}/works/${id}`);
  }
}
