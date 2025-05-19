import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MachineSpecialty } from 'src/app/models/machine-specialty.model';
import { MachineSpecialtyService } from 'src/app/services/machine-specialty.service';
import { MachineService } from 'src/app/services/machine.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  machineSpecialty: MachineSpecialty;
  theFormGroup: FormGroup;
  trySend: boolean;

  machines: any[] = [];      // Lista de máquinas para el select
  serviceTypes: any[] = [];  // Lista de tipos de servicios para el select

  constructor(
    private activateRoute: ActivatedRoute,
    private machineSpecialtyService: MachineSpecialtyService,
    private machineService: MachineService,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.machineSpecialty = { id: 0, machine_id: null, service_type_id: null };
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

    this.loadMachines();
    this.loadServiceTypes();

    if (this.activateRoute.snapshot.params.id) {
      this.machineSpecialty.id = this.activateRoute.snapshot.params.id;
      this.getMachineSpecialty(this.machineSpecialty.id);
    }
  }

  // Cargar máquinas
  loadMachines() {
    this.machineService.list().subscribe({
      next: (data) => this.machines = data,
      error: (error) => console.error('Error cargando máquinas:', error)
    });
  }

  // Cargar tipos de servicio
  loadServiceTypes() {
    this.serviceTypeService.list().subscribe({
      next: (data) => this.serviceTypes = data,
      error: (error) => console.error('Error cargando tipos de servicio:', error)
    });
  }

  getMachineSpecialty(id: number) {
    this.machineSpecialtyService.view(id).subscribe({
      next: (data) => {
        this.machineSpecialty = data;
        this.theFormGroup.patchValue({
          machine_id: this.machineSpecialty.machine_id,
          service_type_id: this.machineSpecialty.service_type_id
        });
      },
      error: (error) => {
        console.error('Error obteniendo especialidad de máquina:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      machine_id: [null, Validators.required],
      service_type_id: [null, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/machine-specialties/list']);
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

    this.machineSpecialtyService.create(this.machineSpecialty).subscribe({
      next: () => {
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/machine-specialties/list']);
      },
      error: (error) => {
        console.error('Error al crear la especialidad de máquina:', error);
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

    this.machineSpecialtyService.update(this.machineSpecialty).subscribe({
      next: () => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/machine-specialties/list']);
      },
      error: (error) => {
        console.error('Error al actualizar la especialidad de máquina:', error);
      }
    });
  }
}
