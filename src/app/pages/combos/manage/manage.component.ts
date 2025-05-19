import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Combo } from 'src/app/models/combo.model';  // Define este modelo según tus atributos
import { ComboService } from 'src/app/services/combo.service'; // Servicio para combos
import { Service } from 'src/app/models/service.model'; // Modelo de servicio para el combo
import { ServiceService } from 'src/app/services/service.service'; // Servicio para obtener servicios
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  combo: Combo;
  theFormGroup: FormGroup;
  trySend: boolean;
  services: Service[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private comboService: ComboService,
    private serviceService: ServiceService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.combo = { id: 0, name: '', description: '', price: 0, services_id: 0 };
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

    this.loadServices();

    if (this.activateRoute.snapshot.params.id) {
      this.combo.id = +this.activateRoute.snapshot.params.id;
      this.getCombo(this.combo.id);
    }
  }

  loadServices() {
    this.serviceService.list().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
      }
    });
  }

  getCombo(id: number) {
    this.comboService.view(id).subscribe({
      next: (combo) => {
        this.combo = combo;
        this.theFormGroup.patchValue({
          name: combo.name,
          description: combo.description,
          price: combo.price,
          services_id: combo.services_id,
        });
      },
      error: (error) => {
        console.error('Error fetching combo:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0)]],
      services_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/combos/list']);
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

    // Actualizar objeto combo con los valores del formulario
    this.combo = {
      ...this.combo,
      ...this.theFormGroup.value
    };

    this.comboService.create(this.combo).subscribe({
      next: (combo) => {
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/combos/list']);
      },
      error: (error) => {
        console.error('Error creating combo:', error);
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

    this.combo = {
      ...this.combo,
      ...this.theFormGroup.value
    };

    this.comboService.update(this.combo).subscribe({
      next: (combo) => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/combos/list']);
      },
      error: (error) => {
        console.error('Error updating combo:', error);
      }
    });
  }
}
