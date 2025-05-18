import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedure } from 'src/app/models/procedure.model';
import { ProcedureService } from 'src/app/services/procedure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  procedure: Procedure;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private procedureService: ProcedureService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.procedure = { id: 0, name: '', description: '' };
    this.trySend = false;
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.procedure.id = this.activateRoute.snapshot.params.id;
      this.getProcedure(this.procedure.id);
    }
  }

  getProcedure(id: number) {
    this.procedureService.view(id).subscribe({
      next: (procedure) => {
        this.procedure = procedure;
        console.log('Procedure fetched successfully:', this.procedure);
      },
      error: (error) => {
        console.error('Error fetching procedure:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/procedures/list']);
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.procedureService.create(this.procedure).subscribe({
      next: (procedure) => {
        console.log('Procedure created successfully:', procedure);
        Swal.fire({
          title: 'Creado!',
          text: 'Procedimiento creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/procedures/list']);
      },
      error: (error) => {
        console.error('Error creating procedure:', error);
      }
    });
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.procedureService.update(this.procedure).subscribe({
      next: (procedure) => {
        console.log('Procedure updated successfully:', procedure);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Procedimiento actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/procedures/list']);
      },
      error: (error) => {
        console.error('Error updating procedure:', error);
      }
    });
  }
}