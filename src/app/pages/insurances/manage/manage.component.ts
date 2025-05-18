import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Insurance } from 'src/app/models/insurance.model';
import { InsuranceService } from 'src/app/services/insurance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  insurance: Insurance;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private insuranceService: InsuranceService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.insurance = { id: 0, name: '', insurance_entity: '', insurance_number: '' };
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
      this.insurance.id = this.activateRoute.snapshot.params.id;
      this.getInsurance(this.insurance.id);
    }
  }

  getInsurance(id: number) {
    this.insuranceService.view(id).subscribe({
      next: (insurance) => {
        this.insurance = insurance;
        console.log('Insurance fetched successfully:', this.insurance);
      },
      error: (error) => {
        console.error('Error fetching insurance:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      insurance_entity: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      insurance_number: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/insurances/list']);
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
    this.insuranceService.create(this.insurance).subscribe({
      next: (insurance) => {
        console.log('Insurance created successfully:', insurance);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de seguro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/insurances/list']);
      },
      error: (error) => {
        console.error('Error creating insurance:', error);
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
    this.insuranceService.update(this.insurance).subscribe({
      next: (insurance) => {
        console.log('Insurance updated successfully:', insurance);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de seguro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/insurances/list']);
      },
      error: (error) => {
        console.error('Error updating insurance:', error);
      }
    });
  }
}