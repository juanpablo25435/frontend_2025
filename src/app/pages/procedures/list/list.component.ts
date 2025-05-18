import { Component, OnInit } from '@angular/core';
import { Procedure } from 'src/app/models/procedure.model';
import { Router } from '@angular/router';
import { ProcedureService } from 'src/app/services/procedure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  procedures: Procedure[] = []; // Cambiado departments → procedures

  constructor(
    private procedureService: ProcedureService, // Cambiado departmentService → procedureService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.procedureService.list().subscribe({
      next: (procedures) => { // Cambiado departments → procedures
        this.procedures = procedures;
        console.log('Procedures fetched successfully:', this.procedures); // Cambiado Departments → Procedures
      },
      error: (error) => {
        console.error('Error fetching procedures:', error); // Cambiado departments → procedures
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/procedures/view', id]); // Cambiado /departments → /procedures
  }

  edit(id: number) {
    this.router.navigate(['/procedures/update', id]); // Cambiado /departments → /procedures
  }

  create() {
    this.router.navigate(['/procedures/create']); // Cambiado /departments → /procedures
  }

  delete(id: number) {
    console.log("Delete procedure with id:", id); // Cambiado department → procedure
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
        this.procedureService.delete(id).subscribe({ // Cambiado departmentService → procedureService
          next: (data) => {
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
              'No se pudo eliminar el procedimiento: ' + error.message, // Cambiado departamento → procedimiento
              'error'
            );
          }
        });
      }
    });
  }
}