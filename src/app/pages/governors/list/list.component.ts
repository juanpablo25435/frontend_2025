import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Governor } from 'src/app/models/governor.model';
import { GovernorService } from 'src/app/services/governor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-governor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  governors: Governor[] = [];

  constructor(
    private governorService: GovernorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.governorService.list().subscribe({
      next: (governors) => {
        this.governors = governors;
        console.log('Governors fetched successfully:', this.governors);
      },
      error: (error) => {
        console.error('Error fetching governors:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/governors/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/governors/update', id]);
  }

  create() {
    this.router.navigate(['/governors/create']);
  }

  delete(id: number) {
    console.log("Delete governor with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que quiere eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.governorService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.ngOnInit(); // recargar lista
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el gobernador: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
