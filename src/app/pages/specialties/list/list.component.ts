import { Component, OnInit } from '@angular/core';
import { Specialty } from 'src/app/models/specialty.model';
import { Router } from '@angular/router';
import { SpecialtyService } from 'src/app/services/specialty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  specialties: Specialty[] = [];

  constructor(
    private specialtyService: SpecialtyService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.specialtyService.list().subscribe({
      next: (specialties) => {
        this.specialties = specialties;
        console.log('Specialties fetched successfully:', this.specialties);
      },
      error: (error) => {
        console.error('Error fetching specialties:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/specialties/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/specialties/update', id]);
  }

  create() {
    this.router.navigate(['/specialties/create']);
  }

  delete(id: number) {
    console.log("Delete specialty with id:", id);
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
        this.specialtyService.delete(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Especialidad eliminada correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar la especialidad: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}