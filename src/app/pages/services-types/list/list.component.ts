import { Component, OnInit } from '@angular/core';
import { ServiceType } from 'src/app/models/service-type.model';
import { Router } from '@angular/router';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  serviceTypes: ServiceType[] = [];

  constructor(
    private serviceTypeService: ServiceTypeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.serviceTypeService.list().subscribe({
      next: (serviceTypes) => {
        this.serviceTypes = serviceTypes;
        console.log('Service types fetched successfully:', this.serviceTypes);
      },
      error: (error) => {
        console.error('Error fetching service types:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/services-types/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/services-types/update', id]);
  }

  create() {
    this.router.navigate(['/services-types/create']);
  }
  
  delete(id: number) {
    console.log("Delete service type with id:", id);
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
        this.serviceTypeService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro de tipo de servicio eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el tipo de servicio: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
