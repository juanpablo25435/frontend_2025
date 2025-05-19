import { Component, OnInit } from '@angular/core';
import { Shift } from 'src/app/models/shift.model';
import { Router } from '@angular/router';
import { ShiftService } from 'src/app/services/shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  shifts: Shift[] = [];

  constructor(
    private shiftService: ShiftService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shiftService.list().subscribe({
      next: (shifts) => {
        this.shifts = shifts;
        console.log('Shifts fetched successfully:', this.shifts);
      },
      error: (error) => {
        console.error('Error fetching shifts:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/shifts/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/shifts/update', id]);
  }

  create() {
    this.router.navigate(['/shifts/create']);
  }

  delete(id: number) {
    console.log("Delete shift with id:", id);
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
        this.shiftService.delete(id).subscribe({
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
              'No se pudo eliminar el turno: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
