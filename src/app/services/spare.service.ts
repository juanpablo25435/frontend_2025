import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Spare } from '../models/spare.model';  // Crea este modelo con id, name, description, price
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpareService {
  private baseUrl = `${environment.url_ms_cinema}/spares`; // Ajusta la URL base si es necesario

  constructor(private http: HttpClient) { }

  list(): Observable<Spare[]> {
    return this.http.get<Spare[]>(this.baseUrl);
  }

  view(id: number): Observable<Spare> {
    return this.http.get<Spare>(`${this.baseUrl}/${id}`);
  }

  create(newSpare: Spare): Observable<Spare> {
    return this.http.post<Spare>(this.baseUrl, newSpare);
  }

  update(theSpare: Spare): Observable<Spare> {
    return this.http.put<Spare>(`${this.baseUrl}/${theSpare.id}`, theSpare);
  }

  delete(id: number): Observable<Spare> {
    return this.http.delete<Spare>(`${this.baseUrl}/${id}`);
  }
}
