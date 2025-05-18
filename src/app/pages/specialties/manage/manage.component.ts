import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialty } from 'src/app/models/specialty.model';
import { SpecialtyService } from 'src/app/services/specialty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  specialty: Specialty;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private specialtyService: SpecialtyService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.specialty = { id: 0, name: '', description: '' };
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
      this.specialty.id = this.activateRoute.snapshot.params.id;
      this.getSpecialty(this.specialty.id);
    }
  }

  getSpecialty(id: number) {
    this.specialtyService.view(id).subscribe({
      next: (specialty) => {
        this.specialty = specialty;
        console.log('Specialty fetched successfully:', this.specialty);
      },
      error: (error) => {
        console.error('Error fetching specialty:', error);
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
    this.router.navigate(['/specialties/list']);
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
    this.specialtyService.create(this.specialty).subscribe({
      next: (specialty) => {
        console.log('Specialty created successfully:', specialty);
        Swal.fire({
          title: 'Creado!',
          text: 'Especialidad creada correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/specialties/list']);
      },
      error: (error) => {
        console.error('Error creating specialty:', error);
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
    this.specialtyService.update(this.specialty).subscribe({
      next: (specialty) => {
        console.log('Specialty updated successfully:', specialty);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Especialidad actualizada correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/specialties/list']);
      },
      error: (error) => {
        console.error('Error updating specialty:', error);
      }
    });
  }
}