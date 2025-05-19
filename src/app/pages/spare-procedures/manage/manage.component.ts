import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpareProcedure } from 'src/app/models/spare-procedure.model';
import { SpareProcedureService } from 'src/app/services/spare-procedure.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  spareProcedure: SpareProcedure;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private spareProcedureService: SpareProcedureService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.spareProcedure = { id: 0, spare_id: 0, maintenance_procedure_id: 0 };
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
      this.spareProcedure.id = +this.activateRoute.snapshot.params.id;
      this.getSpareProcedure(this.spareProcedure.id);
    }
  }

  getSpareProcedure(id: number) {
    this.spareProcedureService.view(id).subscribe({
      next: (spareProcedure) => {
        this.spareProcedure = spareProcedure;
        // Set values in the form
        this.theFormGroup.patchValue({
          spare_id: this.spareProcedure.spare_id,
          maintenance_procedure_id: this.spareProcedure.maintenance_procedure_id
        });
      },
      error: (error) => {
        console.error('Error fetching spare procedure:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      spare_id: [0, [Validators.required, Validators.min(1)]],
      maintenance_procedure_id: [0, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/spare-procedures/list']);
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

    // Actualizar objeto con valores del formulario
    this.spareProcedure.spare_id = this.theFormGroup.value.spare_id;
    this.spareProcedure.maintenance_procedure_id = this.theFormGroup.value.maintenance_procedure_id;

    this.spareProcedureService.create(this.spareProcedure).subscribe({
      next: (spareProcedure) => {
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de spare procedure creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/spare-procedures/list']);
      },
      error: (error) => {
        console.error('Error creating spare procedure:', error);
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

    // Actualizar objeto con valores del formulario
    this.spareProcedure.spare_id = this.theFormGroup.value.spare_id;
    this.spareProcedure.maintenance_procedure_id = this.theFormGroup.value.maintenance_procedure_id;

    this.spareProcedureService.update(this.spareProcedure).subscribe({
      next: (spareProcedure) => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de spare procedure actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/spare-procedures/list']);
      },
      error: (error) => {
        console.error('Error updating spare procedure:', error);
      }
    });
  }
}
