import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/models/maintenance.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  maintenances: Maintenance[] = [];

  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.maintenanceService.list().subscribe({
      next: (maintenances) => {
        this.maintenances = maintenances;
        console.log('Maintenances fetched successfully:', this.maintenances);
      },
      error: (error) => {
        console.error('Error fetching maintenances:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/maintenances/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/maintenances/update', id]);
  }

  create() {
    this.router.navigate(['/maintenances/create']);
  }

  delete(id: number) {
    console.log("Delete maintenance with id:", id);
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
        this.maintenanceService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro de mantenimiento eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el mantenimiento: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
