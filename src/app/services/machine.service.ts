import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Machine } from '../models/machine.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  constructor(private http: HttpClient) { }

  list(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${environment.url_ms_cinema}/machines`);
  }

  view(id: number): Observable<Machine> {
    return this.http.get<Machine>(`${environment.url_ms_cinema}/machines/${id}`);
  }

  create(newMachine: Machine): Observable<Machine> {
    return this.http.post<Machine>(`${environment.url_ms_cinema}/machines`, newMachine);
  }

  update(theMachine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${environment.url_ms_cinema}/machines/${theMachine.id}`, theMachine);
  }

  delete(id: number): Observable<Machine> {
    return this.http.delete<Machine>(`${environment.url_ms_cinema}/machines/${id}`);
  }
}
