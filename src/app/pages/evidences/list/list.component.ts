import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Evidence } from 'src/app/models/evidence.model';
import { EvidenceService } from 'src/app/services/evidence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  evidences: Evidence[] = [];

  constructor(
    private evidenceService: EvidenceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.evidenceService.list().subscribe({
      next: (evidences) => {
        this.evidences = evidences;
        console.log('Evidences fetched successfully:', this.evidences);
      },
      error: (error) => {
        console.error('Error fetching evidences:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/evidences/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/evidences/update', id]);
  }

  create() {
    this.router.navigate(['/evidences/create']);
  }

  delete(id: number) {
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
        this.evidenceService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Registro eliminado correctamente.', 'success');
            this.ngOnInit(); // Recarga la lista
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la evidencia: ' + error.message, 'error');
          }
        });
      }
    });
  }
}
