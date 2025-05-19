import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> Ver, 2 -> Crear, 3 -> Actualizar
  shift: Shift;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private shiftService: ShiftService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.shift = {
      id: 0,
      start_time: 0,
      end_time: 0,
      machine_id: 0,
      operator_id: 0
    };
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
      this.shift.id = +this.activateRoute.snapshot.params.id;
      this.getShift(this.shift.id);
    }
  }

  getShift(id: number) {
    this.shiftService.view(id).subscribe({
      next: (shift) => {
        this.shift = shift;
        // Sincronizar valores con formulario
        this.theFormGroup.patchValue({
          start_time: shift.start_time,
          end_time: shift.end_time,
          machine_id: shift.machine_id,
          operator_id: shift.operator_id
        });
        console.log('Shift fetched successfully:', this.shift);
      },
      error: (error) => {
        console.error('Error fetching shift:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
    start_time: [0, [Validators.required, Validators.min(0), Validators.max(2359)]],
    end_time: [0, [Validators.required, Validators.min(0), Validators.max(2359)]],
    machine_id: [0, [Validators.required, Validators.min(1)]],
    operator_id: [0, [Validators.required, Validators.min(1)]]
  });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/shifts/list']);
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
    this.shift = {
      ...this.shift,
      ...this.theFormGroup.value
    };

    this.shiftService.create(this.shift).subscribe({
      next: (shift) => {
        console.log('Shift created successfully:', shift);
        Swal.fire({
          title: 'Creado!',
          text: 'Turno creado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/shifts/list']);
      },
      error: (error) => {
        console.error('Error creating shift:', error);
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
    this.shift = {
      ...this.shift,
      ...this.theFormGroup.value
    };

    this.shiftService.update(this.shift).subscribe({
      next: (shift) => {
        console.log('Shift updated successfully:', shift);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Turno actualizado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/shifts/list']);
      },
      error: (error) => {
        console.error('Error updating shift:', error);
      }
    });
  }
}
