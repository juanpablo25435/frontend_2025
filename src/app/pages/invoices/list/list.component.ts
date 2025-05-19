import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  invoices: Invoice[] = []; // Lista de facturas

  constructor(
    private invoiceService: InvoiceService, // Servicio para facturas
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.invoiceService.list().subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        console.log('Invoices fetched successfully:', this.invoices);
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/invoices/view', id]); // Ruta para ver factura
  }

  edit(id: number) {
    this.router.navigate(['/invoices/update', id]); // Ruta para editar factura
  }

  create() {
    this.router.navigate(['/invoices/create']); // Ruta para crear factura
  }
  
  delete(id: number) {
    console.log("Delete invoice with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro de factura eliminado correctamente.',
              'success'
            );
            this.ngOnInit(); // Refresca la lista
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar la factura: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
