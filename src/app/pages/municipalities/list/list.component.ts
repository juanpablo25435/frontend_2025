import { Component, OnInit } from '@angular/core';
import { Municipality } from 'src/app/models/municipality.model';
import { Router } from '@angular/router';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  municipalities: Municipality[] = [];

  constructor(
    private municipalityService: MunicipalityService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.municipalityService.list().subscribe({
      next: (municipalities) => {
        this.municipalities = municipalities;
        console.log('Municipalities fetched successfully:', this.municipalities);
      },
      error: (error) => {
        console.error('Error fetching municipalities:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/municipalities/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/municipalities/update', id]);
  }

  create() {
    this.router.navigate(['/municipalities/create']);
  }
  
  delete(id: number) {
    console.log("Delete municipality with id:", id);
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
        this.municipalityService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Municipio eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el municipio: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
