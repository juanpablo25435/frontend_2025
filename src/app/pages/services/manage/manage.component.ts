import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> Ver, 2 -> Crear, 3 -> Actualizar
  service: Service;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.service = {
      id: 0,
      name: '',
      description: '',
      start_date: new Date(),
      end_date: new Date(),
      price: 0
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
      this.service.id = this.activateRoute.snapshot.params.id;
      this.getService(this.service.id);
    }
  }

  getService(id: number) {
    this.serviceService.view(id).subscribe({
      next: (service) => {
        this.service = service;
        console.log('Service fetched successfully:', this.service);
      },
      error: (error) => {
        console.error('Error fetching service:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/services/list']);
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
    this.serviceService.create(this.service).subscribe({
      next: (service) => {
        console.log('Service created successfully:', service);
        Swal.fire({
          title: 'Creado!',
          text: 'Servicio creado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/services/list']);
      },
      error: (error) => {
        console.error('Error creating service:', error);
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
    this.serviceService.update(this.service).subscribe({
      next: (service) => {
        console.log('Service updated successfully:', service);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Servicio actualizado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/services/list']);
      },
      error: (error) => {
        console.error('Error updating service:', error);
      }
    });
  }
}
