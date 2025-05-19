import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fee } from 'src/app/models/fee.model';
import { FeeService } from 'src/app/services/fee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  fee: Fee;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private feeService: FeeService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.fee = {
      id: 0,
      fee_number: '',
      fee_date: new Date(),
      fee_amount: 0,
      invoice_id: 0,
      service_id: 0
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
      this.fee.id = this.activateRoute.snapshot.params.id;
      this.getFee(this.fee.id);
    }
  }

  getFee(id: number) {
    this.feeService.view(id).subscribe({
      next: (fee) => {
        this.fee = fee;
        console.log('Fee fetched successfully:', this.fee);
      },
      error: (error) => {
        console.error('Error fetching fee:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      fee_number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      fee_date: ['', [Validators.required]],
      fee_amount: [0, [Validators.required, Validators.min(0)]],
      invoice_id: [0, [Validators.required, Validators.min(1)]],
      service_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/fees/list']);
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
    this.feeService.create(this.fee).subscribe({
      next: (fee) => {
        console.log('Fee created successfully:', fee);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/fees/list']);
      },
      error: (error) => {
        console.error('Error creating fee:', error);
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
    this.feeService.update(this.fee).subscribe({
      next: (fee) => {
        console.log('Fee updated successfully:', fee);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/fees/list']);
      },
      error: (error) => {
        console.error('Error updating fee:', error);
      }
    });
  }
}
