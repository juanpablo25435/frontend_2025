import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MachineSpecialty } from '../models/machine-specialty.model';

@Injectable({
  providedIn: 'root'
})
export class MachineSpecialtyService {
  constructor(private http: HttpClient) {}

  list(): Observable<MachineSpecialty[]> {
    return this.http.get<MachineSpecialty[]>(`${environment.url_ms_cinema}/machine_specialties`);
  }

  view(id: number): Observable<MachineSpecialty> {
    return this.http.get<MachineSpecialty>(`${environment.url_ms_cinema}/machine_specialties/${id}`);
  }

  create(newMachineSpecialty: MachineSpecialty): Observable<MachineSpecialty> {
    return this.http.post<MachineSpecialty>(
      `${environment.url_ms_cinema}/machine_specialties`,
      newMachineSpecialty
    );
  }

  update(theMachineSpecialty: MachineSpecialty): Observable<MachineSpecialty> {
    return this.http.put<MachineSpecialty>(
      `${environment.url_ms_cinema}/machine_specialties/${theMachineSpecialty.id}`,
      theMachineSpecialty
    );
  }

  delete(id: number): Observable<MachineSpecialty> {
    return this.http.delete<MachineSpecialty>(`${environment.url_ms_cinema}/machine_specialties/${id}`);
  }
}
