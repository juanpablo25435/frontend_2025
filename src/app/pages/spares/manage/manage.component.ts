import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Spare } from 'src/app/models/spare.model'; // Cambiado a Spare
import { SpareService } from 'src/app/services/spare.service'; // Cambiado a SpareService
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> Ver, 2 -> Crear, 3 -> Actualizar
  spare: Spare;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private spareService: SpareService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.spare = {
      id: 0,
      name: '',
      description: '',
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
      this.spare.id = +this.activateRoute.snapshot.params.id;
      this.getSpare(this.spare.id);
    }
  }

  getSpare(id: number) {
    this.spareService.view(id).subscribe({
      next: (spare) => {
        this.spare = spare;
        this.theFormGroup.patchValue({
          name: spare.name,
          description: spare.description,
          price: spare.price
        });
        console.log('Spare fetched successfully:', this.spare);
      },
      error: (error) => {
        console.error('Error fetching spare:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/spares/list']);
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

    this.spare = {
      ...this.spare,
      ...this.theFormGroup.value
    };

    this.spareService.create(this.spare).subscribe({
      next: (spare) => {
        console.log('Spare created successfully:', spare);
        Swal.fire({
          title: 'Creado!',
          text: 'Repuesto creado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/spares/list']);
      },
      error: (error) => {
        console.error('Error creating spare:', error);
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

    this.spare = {
      ...this.spare,
      ...this.theFormGroup.value
    };

    this.spareService.update(this.spare).subscribe({
      next: (spare) => {
        console.log('Spare updated successfully:', spare);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Repuesto actualizado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/spares/list']);
      },
      error: (error) => {
        console.error('Error updating spare:', error);
      }
    });
  }
}
