import { Component, OnInit } from '@angular/core';
import { Fee } from 'src/app/models/fee.model';
import { Router } from '@angular/router';
import { FeeService } from 'src/app/services/fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  fees: Fee[] = [];

  constructor(
    private feeService: FeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.feeService.list().subscribe({
      next: (fees) => {
        this.fees = fees;
        console.log('Fees fetched successfully:', this.fees);
      },
      error: (error) => {
        console.error('Error fetching fees:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/fees/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/fees/update', id]);
  }

  create() {
    this.router.navigate(['/fees/create']);
  }

  delete(id: number) {
    console.log("Delete fee with id:", id);
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
        this.feeService.delete(id).subscribe({
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
              'No se pudo eliminar la cuota: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
