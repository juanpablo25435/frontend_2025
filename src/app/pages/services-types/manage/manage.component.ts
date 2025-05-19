import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceType } from 'src/app/models/service-type.model';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  serviceType: ServiceType;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private serviceTypeService: ServiceTypeService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.serviceType = { id: 0, name: '', description: '' };
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
      this.serviceType.id = this.activateRoute.snapshot.params.id;
      this.getServiceType(this.serviceType.id);
    }
  }

  getServiceType(id: number) {
    this.serviceTypeService.view(id).subscribe({
      next: (serviceType) => {
        this.serviceType = serviceType;
        console.log('Service Type fetched successfully:', this.serviceType);
      },
      error: (error) => {
        console.error('Error fetching service type:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/service-types/list']);
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.serviceTypeService.create(this.serviceType).subscribe({
      next: (serviceType) => {
        console.log('Service Type created successfully:', serviceType);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de tipo de servicio creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/service-types/list']);
      },
      error: (error) => {
        console.error('Error creating service type:', error);
      }
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.serviceTypeService.update(this.serviceType).subscribe({
      next: (serviceType) => {
        console.log('Service Type updated successfully:', serviceType);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de tipo de servicio actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/service-types/list']);
      },
      error: (error) => {
        console.error('Error updating service type:', error);
      }
    });
  }
}
