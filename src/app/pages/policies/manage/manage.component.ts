import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Policy } from 'src/app/models/policy.model';
import { PolicyService } from 'src/app/services/policy.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  policy: Policy;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private policyService: PolicyService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.policy = { 
      id: 0, 
      policy_number: 0, 
      start_date: new Date(), 
      end_date: new Date(), 
      machine_id: 0, 
      insurance_id: 0 
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
      this.policy.id = this.activateRoute.snapshot.params.id;
      this.getPolicy(this.policy.id);
    }
  }

  getPolicy(id: number) {
    this.policyService.view(id).subscribe({
      next: (policy) => {
        this.policy = policy;
        console.log('Policy fetched successfully:', this.policy);
      },
      error: (error) => {
        console.error('Error fetching policy:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      policy_number: [0, [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      machine_id: [0, [Validators.required]],
      insurance_id: [0, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/policies/list']);
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
    this.policyService.create(this.policy).subscribe({
      next: (policy) => {
        console.log('Policy created successfully:', policy);
        Swal.fire({
          title: 'Creado!',
          text: 'Póliza creada correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/policies/list']);
      },
      error: (error) => {
        console.error('Error creating policy:', error);
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
    this.policyService.update(this.policy).subscribe({
      next: (policy) => {
        console.log('Policy updated successfully:', policy);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Póliza actualizada correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/policies/list']);
      },
      error: (error) => {
        console.error('Error updating policy:', error);
      }
    });
  }
}