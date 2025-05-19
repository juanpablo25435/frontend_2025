import { Component, OnInit } from '@angular/core';
import { Combo } from 'src/app/models/combo.model';
import { Router } from '@angular/router';
import { ComboService } from 'src/app/services/combo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  combos: Combo[] = [];

  constructor(
    private comboService: ComboService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.comboService.list().subscribe({
      next: (combos) => {
        this.combos = combos;
        console.log('Combos fetched successfully:', this.combos);
      },
      error: (error) => {
        console.error('Error fetching combos:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/combos/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/combos/update', id]);
  }

  create() {
    this.router.navigate(['/combos/create']);
  }

  delete(id: number) {
    console.log("Delete combo with id:", id);
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
        this.comboService.delete(id).subscribe({
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
              'No se pudo eliminar el combo: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
