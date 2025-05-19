import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ComboMachine } from '../models/combo-machine.model'; // Asegúrate de crear este modelo

@Injectable({
  providedIn: 'root'
})
export class ComboMachineService {
  constructor(private http: HttpClient) { }

  list(): Observable<ComboMachine[]> {
    return this.http.get<ComboMachine[]>(`${environment.url_ms_cinema}/combo_machines`);
  }

  view(id: number): Observable<ComboMachine> {
    return this.http.get<ComboMachine>(`${environment.url_ms_cinema}/combo_machines/${id}`);
  }

  create(newComboMachine: ComboMachine): Observable<ComboMachine> {
    return this.http.post<ComboMachine>(`${environment.url_ms_cinema}/combo_machines`, newComboMachine);
  }

  update(theComboMachine: ComboMachine): Observable<ComboMachine> {
    return this.http.put<ComboMachine>(`${environment.url_ms_cinema}/combo_machines/${theComboMachine.id}`, theComboMachine);
  }

  delete(id: number): Observable<ComboMachine> {
    return this.http.delete<ComboMachine>(`${environment.url_ms_cinema}/combo_machines/${id}`);
  }
}
