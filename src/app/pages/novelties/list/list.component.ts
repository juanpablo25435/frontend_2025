import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Novelty } from 'src/app/models/novelty.model';
import { NoveltyService } from 'src/app/services/novelty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  novelties: Novelty[] = [];

  constructor(
    private noveltyService: NoveltyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.noveltyService.list().subscribe({
      next: (novelties) => {
        this.novelties = novelties;
        console.log('Novelties fetched successfully:', this.novelties);
      },
      error: (error) => {
        console.error('Error fetching novelties:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/novelties/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/novelties/update', id]);
  }

  create() {
    this.router.navigate(['/novelties/create']);
  }

  delete(id: number) {
    console.log("Delete novelty with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar la novedad?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noveltyService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Novedad eliminada correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar la novedad: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
