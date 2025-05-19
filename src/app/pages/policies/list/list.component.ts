import { Component, OnInit } from '@angular/core';
import { Policy } from 'src/app/models/policy.model';
import { Router } from '@angular/router';
import { PolicyService } from 'src/app/services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  policies: Policy[] = [];

  constructor(
    private policyService: PolicyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.policyService.list().subscribe({
      next: (policies) => {
        this.policies = policies;
        console.log('Policies fetched successfully:', this.policies);
      },
      error: (error) => {
        console.error('Error fetching policies:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/policies/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/policies/update', id]);
  }

  create() {
    this.router.navigate(['/policies/create']);
  }

  delete(id: number) {
    console.log("Delete policy with id:", id);
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
        this.policyService.delete(id).subscribe({
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
              'No se pudo eliminar la póliza: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}