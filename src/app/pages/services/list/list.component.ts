import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  services: Service[] = [];

  constructor(
    private serviceService: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.serviceService.list().subscribe({
      next: (services) => {
        this.services = services;
        console.log('Services fetched successfully:', this.services);
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/services/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/services/update', id]);
  }

  create() {
    this.router.navigate(['/services/create']);
  }

  delete(id: number) {
    console.log("Delete service with id:", id);
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
        this.serviceService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el servicio: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
