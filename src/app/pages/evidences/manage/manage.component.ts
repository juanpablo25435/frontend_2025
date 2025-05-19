import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evidence } from 'src/app/models/evidence.model';
import { EvidenceService } from 'src/app/services/evidence.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  evidence: Evidence;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private evidenceService: EvidenceService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.evidence = { id: 0, evidence_description: '', service_id: 0 };
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
      this.evidence.id = this.activateRoute.snapshot.params.id;
      this.getEvidence(this.evidence.id);
    }
  }

  getEvidence(id: number) {
    this.evidenceService.view(id).subscribe({
      next: (evidence) => {
        this.evidence = evidence;
        console.log('Evidence fetched successfully:', this.evidence);
      },
      error: (error) => {
        console.error('Error fetching evidence:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      evidence_description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      service_id: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/evidences/list']);
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

    this.evidenceService.create(this.evidence).subscribe({
      next: (evidence) => {
        console.log('Evidence created successfully:', evidence);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/evidences/list']);
      },
      error: (error) => {
        console.error('Error creating evidence:', error);
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

    this.evidenceService.update(this.evidence).subscribe({
      next: (evidence) => {
        console.log('Evidence updated successfully:', evidence);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/evidences/list']);
      },
      error: (error) => {
        console.error('Error updating evidence:', error);
      }
    });
  }
}
