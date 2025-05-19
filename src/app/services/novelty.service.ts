import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Novelty } from 'src/app/models/novelty.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoveltyService {

  constructor(private http: HttpClient) { }

  list(): Observable<Novelty[]> {
    return this.http.get<Novelty[]>(`${environment.url_ms_cinema}/novelties`);
  }

  view(id: number): Observable<Novelty> {
    return this.http.get<Novelty>(`${environment.url_ms_cinema}/novelties/${id}`);
  }

  create(newNovelty: Novelty): Observable<Novelty> {
    return this.http.post<Novelty>(`${environment.url_ms_cinema}/novelties`, newNovelty);
  }

  update(theNovelty: Novelty): Observable<Novelty> {
    return this.http.put<Novelty>(
      `${environment.url_ms_cinema}/novelties/${theNovelty.id}`,
      theNovelty
    );
  }

  delete(id: number): Observable<Novelty> {
    return this.http.delete<Novelty>(`${environment.url_ms_cinema}/novelties/${id}`);
  }
}
