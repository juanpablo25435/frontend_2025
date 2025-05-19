import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MachineSpecialty } from 'src/app/models/machine-specialty.model';
import { MachineSpecialtyService } from 'src/app/services/machine-specialty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  machineSpecialties: MachineSpecialty[] = [];

  constructor(
    private machineSpecialtyService: MachineSpecialtyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.machineSpecialtyService.list().subscribe({
      next: (machineSpecialties) => {
        this.machineSpecialties = machineSpecialties;
        console.log('Machine specialties fetched successfully:', this.machineSpecialties);
      },
      error: (error) => {
        console.error('Error fetching machine specialties:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/machine-specialties/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/machine-specialties/update', id]);
  }

  create() {
    this.router.navigate(['/machine-specialties/create']);
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
        this.machineSpecialtyService.delete(id).subscribe({
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
