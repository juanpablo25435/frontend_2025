import { Component, OnInit } from '@angular/core';
import { ComboMachine } from 'src/app/models/combo-machine.model';
import { Router } from '@angular/router';
import { ComboMachineService } from 'src/app/services/combo-machine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  comboMachines: ComboMachine[] = [];

  constructor(
    private comboMachineService: ComboMachineService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.comboMachineService.list().subscribe({
      next: (comboMachines) => {
        this.comboMachines = comboMachines;
        console.log('Combo Machines fetched successfully:', this.comboMachines);
      },
      error: (error) => {
        console.error('Error fetching combo machines:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/combo-machines/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/combo-machines/update', id]);
  }

  create() {
    this.router.navigate(['/combo-machines/create']);
  }

  delete(id: number) {
    console.log("Delete combo machine with id:", id);
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
        this.comboMachineService.delete(id).subscribe({
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
              'No se pudo eliminar el combo de máquina: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}