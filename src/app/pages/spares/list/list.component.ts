import { Component, OnInit } from '@angular/core';
import { Spare } from 'src/app/models/spare.model';
import { Router } from '@angular/router';
import { SpareService } from 'src/app/services/spare.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  spares: Spare[] = [];

  constructor(
    private spareService: SpareService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.spareService.list().subscribe({
      next: (spares) => {
        this.spares = spares;
        console.log('Spares fetched successfully:', this.spares);
      },
      error: (error) => {
        console.error('Error fetching spares:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/spares/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/spares/update', id]);
  }

  create() {
    this.router.navigate(['/spares/create']);
  }

  delete(id: number) {
    console.log("Delete spare with id:", id);
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
        this.spareService.delete(id).subscribe({
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
              'No se pudo eliminar el repuesto: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
