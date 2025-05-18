import { Component, OnInit } from '@angular/core';
import { Insurance } from 'src/app/models/insurance.model';
import { Router } from '@angular/router';
import { InsuranceService } from 'src/app/services/insurance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  insurances: Insurance[] = []; // Changed departments to insurances

  constructor(
    private insuranceService: InsuranceService, // Changed departmentService to insuranceService
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.insuranceService.list().subscribe({ // Changed service call
      next: (insurances) => { // Changed departments to insurances
        this.insurances = insurances;
        console.log('Insurances fetched successfully:', this.insurances); // Updated log message
      },
      error: (error) => {
        console.error('Error fetching insurances:', error); // Updated error message
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/insurances/view', id]); // Updated route
  }

  edit(id: number) {
    this.router.navigate(['/insurances/update', id]); // Updated route
  }

  delete(id: number) {
    console.log("Delete insurance with id:", id); // Updated log message
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
        this.insuranceService.delete(id).subscribe({ // Changed service call
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Registro de seguro eliminado correctamente.', // Updated success message
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el seguro: ' + error.message, // Updated error message
              'error'
            );
          }
        });
      }
    });
  }
}