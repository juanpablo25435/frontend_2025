import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorSpecialty } from 'src/app/models/operator-specialty.model';
import { OperatorSpecialtyService } from 'src/app/services/operator-specialty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  operatorSpecialties: OperatorSpecialty[] = [];

  constructor(
    private operatorSpecialtyService: OperatorSpecialtyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.operatorSpecialtyService.list().subscribe({
      next: (operatorSpecialties) => {
        this.operatorSpecialties = operatorSpecialties;
        console.log('Operator specialties fetched successfully:', this.operatorSpecialties);
      },
      error: (error) => {
        console.error('Error fetching operator specialties:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/operator-specialties/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/operator-specialties/update', id]);
  }

  create() {
    this.router.navigate(['/operator-specialties/create']);
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
        this.operatorSpecialtyService.delete(id).subscribe({
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
              'No se pudo eliminar el registro: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
