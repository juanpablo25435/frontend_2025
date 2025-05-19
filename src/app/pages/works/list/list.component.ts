import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import { Router } from '@angular/router';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  works: Work[] = [];

  constructor(
    private workService: WorkService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.workService.list().subscribe({
      next: (works) => {
        this.works = works;
        console.log('Works fetched successfully:', this.works);
      },
      error: (error) => {
        console.error('Error fetching works:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/works/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/works/update', id]);
  }

  create() {
    this.router.navigate(['/works/create']);
  }
  
  delete(id: number) {
    console.log("Delete work with id:", id);
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
        this.workService.delete(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Registro de trabajo eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el trabajo: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
