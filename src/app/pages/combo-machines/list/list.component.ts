import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComboMachineService } from 'src/app/services/combo-machine.service';
import { ComboMachine } from 'src/app/models/combo-machine.model';
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
  ) {}

  ngOnInit(): void {
    this.comboMachineService.list().subscribe({
      next: (data) => {
        this.comboMachines = data;
        console.log('ComboMachines fetched:', data);
      },
      error: (err) => {
        console.error('Error loading comboMachines:', err);
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
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que desea eliminar este combo-máquina?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comboMachineService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Combo-máquina eliminado correctamente.', 'success');
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar: ' + error.message, 'error');
          }
        });
      }
    });
  }
}

