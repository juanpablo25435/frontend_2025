import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  municipality: Municipality;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private municipalityService: MunicipalityService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.municipality = { id: 0, name: '', department_id: 0 };
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
      this.municipality.id = this.activateRoute.snapshot.params.id;
      this.getMunicipality(this.municipality.id);
    }
  }

  getMunicipality(id: number) {
    this.municipalityService.view(id).subscribe({
      next: (municipality) => {
        this.municipality = municipality;
        console.log('Municipality fetched successfully:', this.municipality);
      },
      error: (error) => {
        console.error('Error fetching municipality:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      department_id: [null, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/municipalities/list']);
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
    this.municipalityService.create(this.municipality).subscribe({
      next: (municipality) => {
        console.log('Municipality created successfully:', municipality);
        Swal.fire({
          title: 'Creado!',
          text: 'Municipio creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/municipalities/list']);
      },
      error: (error) => {
        console.error('Error creating municipality:', error);
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
    this.municipalityService.update(this.municipality).subscribe({
      next: (municipality) => {
        console.log('Municipality updated successfully:', municipality);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Municipio actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/municipalities/list']);
      },
      error: (error) => {
        console.error('Error updating municipality:', error);
      }
    });
  }
}
