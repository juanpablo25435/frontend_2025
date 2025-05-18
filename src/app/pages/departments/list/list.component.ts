import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/models/department.model';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentService: DepartmentService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.departmentService.list().subscribe({
      next: (departments) => {
        this.departments = departments;
        console.log('Departments fetched successfully:', this.departments);
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/departments/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/departments/update', id]);
  }

  create() {
    this.router.navigate(['/departments/create']);
  }

  delete(id: number) {
    console.log("Delete department with id:", id);
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
        this.departmentService.delete(id).subscribe({
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
              'No se pudo eliminar el departamento: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}