import { Component, OnInit } from '@angular/core';
import { Operator } from 'src/app/models/operator.model';
import { Router } from '@angular/router';
import { OperatorService } from 'src/app/services/operator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  operators: Operator[] = [];

  constructor(
    private operatorService: OperatorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOperators();
  }

  loadOperators() {
    this.operatorService.list().subscribe({
      next: (operators) => {
        this.operators = operators;
        console.log('Operators fetched successfully:', this.operators);
      },
      error: (error) => {
        console.error('Error fetching operators:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/operators/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/operators/update', id]);
  }

  create() {
    this.router.navigate(['/operators/create']);
  }

  delete(id: number) {
    console.log("Delete operator with id:", id);
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
        this.operatorService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Operador eliminado correctamente.',
              'success'
            );
            this.loadOperators();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el operador: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
