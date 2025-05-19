import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gps } from 'src/app/models/gps.model';
import { GpsService } from 'src/app/services/gps.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  gps: Gps;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private gpsService: GpsService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.gps = { id: 0, latitude: '', longitude: '', altitude: '', machine_id: 0 };
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
      this.gps.id = this.activateRoute.snapshot.params.id;
      this.getGps(this.gps.id);
    }
  }

  getGps(id: number) {
    this.gpsService.view(id).subscribe({
      next: (gps) => {
        this.gps = gps;
        console.log('GPS fetched successfully:', this.gps);
      },
      error: (error) => {
        console.error('Error fetching GPS:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      latitude: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      longitude: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      altitude: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      machine_id: [0, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/gps/list']);
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
    this.gpsService.create(this.gps).subscribe({
      next: (gps) => {
        console.log('GPS created successfully:', gps);
        Swal.fire({
          title: 'Creado!',
          text: 'GPS creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/gps/list']);
      },
      error: (error) => {
        console.error('Error creating GPS:', error);
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
    this.gpsService.update(this.gps).subscribe({
      next: (gps) => {
        console.log('GPS updated successfully:', gps);
        Swal.fire({
          title: 'Actualizado!',
          text: 'GPS actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/gps/list']);
      },
      error: (error) => {
        console.error('Error updating GPS:', error);
      }
    });
  }
}
