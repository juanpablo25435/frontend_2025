import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GpsService } from 'src/app/services/gps.service';
import { Gps } from 'src/app/models/gps.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  gpsList: Gps[] = [];

  constructor(
    private gpsService: GpsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gpsService.list().subscribe({
      next: (gpsData) => {
        this.gpsList = gpsData;
        console.log('GPS data fetched successfully:', this.gpsList);
      },
      error: (error) => {
        console.error('Error fetching GPS data:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/gps/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/gps/update', id]);
  }

  create() {
    this.router.navigate(['/gps/create']);
  }

  delete(id: number) {
    console.log("Delete GPS with id:", id);
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
        this.gpsService.delete(id).subscribe({
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
              'No se pudo eliminar el GPS: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
