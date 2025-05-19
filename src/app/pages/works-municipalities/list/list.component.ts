import { Component, OnInit } from '@angular/core';
import { WorkMunicipality } from 'src/app/models/work-municipality.model';
import { Router } from '@angular/router';
import { WorkMunicipalityService } from 'src/app/services/work-municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  workMunicipalities: WorkMunicipality[] = [];

  constructor(
    private workMunicipalityService: WorkMunicipalityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.workMunicipalityService.list().subscribe({
      next: (workMunicipalities) => {
        this.workMunicipalities = workMunicipalities;
        console.log('Work Municipalities fetched successfully:', this.workMunicipalities);
      },
      error: (error) => {
        console.error('Error fetching work municipalities:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/work-municipalities/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/work-municipalities/update', id]);
  }

  create() {
    this.router.navigate(['/work-municipalities/create']);
  }

  delete(id: number) {
    console.log("Delete work municipality with id:", id);
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
        this.workMunicipalityService.delete(id).subscribe({
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
              'No se pudo eliminar el trabajo por municipio: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}