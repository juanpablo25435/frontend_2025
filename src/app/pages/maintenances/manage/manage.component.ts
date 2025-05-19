import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Maintenance } from 'src/app/models/maintenance.model';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  maintenance: Maintenance;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private maintenanceService: MaintenanceService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.maintenance = {
      id: 0,
      description: '',
      date_performed: new Date(),
      machine_id: 0
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
      this.maintenance.id = +this.activateRoute.snapshot.params.id;
      this.getMaintenance(this.maintenance.id);
    }
  }

  getMaintenance(id: number) {
    this.maintenanceService.view(id).subscribe({
      next: (maintenance) => {
        this.maintenance = maintenance;
        console.log('Maintenance fetched successfully:', this.maintenance);
      },
      error: (error) => {
        console.error('Error fetching maintenance:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      date_performed: ['', [Validators.required]],
      machine_id: ['', [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/maintenances/list']);
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
    this.maintenanceService.create(this.maintenance).subscribe({
      next: (maintenance) => {
        console.log('Maintenance created successfully:', maintenance);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de mantenimiento creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/maintenances/list']);
      },
      error: (error) => {
        console.error('Error creating maintenance:', error);
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
    this.maintenanceService.update(this.maintenance).subscribe({
      next: (maintenance) => {
        console.log('Maintenance updated successfully:', maintenance);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de mantenimiento actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/maintenances/list']);
      },
      error: (error) => {
        console.error('Error updating maintenance:', error);
      }
    });
  }
}
