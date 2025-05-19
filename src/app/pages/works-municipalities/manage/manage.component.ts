import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkMunicipality } from 'src/app/models/work-municipality.model';
import { WorkMunicipalityService } from 'src/app/services/work-municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  workMunicipality: WorkMunicipality;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private workMunicipalityService: WorkMunicipalityService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.workMunicipality = { 
      id: 0, 
      work_id: 0,
      municipality_id: 0
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
      this.workMunicipality.id = this.activateRoute.snapshot.params.id;
      this.getWorkMunicipality(this.workMunicipality.id);
    }
  }

  getWorkMunicipality(id: number) {
    this.workMunicipalityService.view(id).subscribe({
      next: (workMunicipality) => {
        this.workMunicipality = workMunicipality;
        console.log('Work Municipality fetched successfully:', this.workMunicipality);
      },
      error: (error) => {
        console.error('Error fetching work municipality:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      work_id: [0, [Validators.required]],
      municipality_id: [0, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/work-municipalities/list']);
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
    this.workMunicipalityService.create(this.workMunicipality).subscribe({
      next: (workMunicipality) => {
        console.log('Work Municipality created successfully:', workMunicipality);
        Swal.fire({
          title: 'Creado!',
          text: 'Trabajo por municipio creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/work-municipalities/list']);
      },
      error: (error) => {
        console.error('Error creating work municipality:', error);
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
    this.workMunicipalityService.update(this.workMunicipality).subscribe({
      next: (workMunicipality) => {
        console.log('Work Municipality updated successfully:', workMunicipality);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Trabajo por municipio actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/work-municipalities/list']);
      },
      error: (error) => {
        console.error('Error updating work municipality:', error);
      }
    });
  }
}