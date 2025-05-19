import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(private http: HttpClient) { }

  list(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${environment.url_ms_cinema}/invoices`);
  }

  view(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${environment.url_ms_cinema}/invoices/${id}`);
  }

  create(newInvoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${environment.url_ms_cinema}/invoices`, newInvoice);
  }

  update(theInvoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(
      `${environment.url_ms_cinema}/invoices/${theInvoice.id}`, 
      theInvoice
    );
  }

  delete(id: number): Observable<Invoice> {
    return this.http.delete<Invoice>(`${environment.url_ms_cinema}/invoices/${id}`);
  }
}
