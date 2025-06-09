import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Machine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/services/machine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  machine: Machine;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private machineService: MachineService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.machine = { id: 0, name: '', description: '', model_year: '' };
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
      this.machine.id = +this.activateRoute.snapshot.params.id;
      this.getMachine(this.machine.id);
    }
  }

  getMachine(id: number) {
    this.machineService.view(id).subscribe({
      next: (machine) => {
        this.machine = machine;
        console.log('Machine fetched successfully:', this.machine);
      },
      error: (error) => {
        console.error('Error fetching machine:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      model_year: [''],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/machines/list']);
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.machineService.create(this.machine).subscribe({
      next: (machine) => {
        console.log('Machine created successfully:', machine);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de máquina creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/machines/list']);
      },
      error: (error) => {
        console.error('Error creating machine:', error);
      }
    });
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.machineService.update(this.machine).subscribe({
      next: (machine) => {
        console.log('Machine updated successfully:', machine);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de máquina actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/machines/list']);
      },
      error: (error) => {
        console.error('Error updating machine:', error);
      }
    });
  }
}
