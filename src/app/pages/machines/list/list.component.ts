import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { Router } from '@angular/router';
import { MachineService } from 'src/app/services/machine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  machines: Machine[] = [];

  constructor(
    private machineService: MachineService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.machineService.list().subscribe({
      next: (machines) => {
        this.machines = machines;
        console.log('Machines fetched successfully:', this.machines);
      },
      error: (error) => {
        console.error('Error fetching machines:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/machines/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/machines/update', id]);
  }

  create() {
    this.router.navigate(['/machines/create']);
  }

  delete(id: number) {
    console.log("Delete machine with id:", id);
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
        this.machineService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro de máquina eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar la máquina: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
