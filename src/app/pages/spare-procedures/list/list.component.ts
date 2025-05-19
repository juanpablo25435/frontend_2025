import { Component, OnInit } from '@angular/core';
import { SpareProcedure } from 'src/app/models/spare-procedure.model';
import { Router } from '@angular/router';
import { SpareProcedureService } from 'src/app/services/spare-procedure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  spareProcedures: SpareProcedure[] = [];

  constructor(
    private spareProcedureService: SpareProcedureService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.spareProcedureService.list().subscribe({
      next: (spareProcedures) => {
        this.spareProcedures = spareProcedures;
        console.log('Spare procedures fetched successfully:', this.spareProcedures);
      },
      error: (error) => {
        console.error('Error fetching spare procedures:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/spare-procedures/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/spare-procedures/update', id]);
  }

  create() {
    this.router.navigate(['/spare-procedures/create']);
  }

  delete(id: number) {
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
        this.spareProcedureService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.ngOnInit();  // refresca la lista
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el registro: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
