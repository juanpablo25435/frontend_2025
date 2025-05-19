import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from 'src/app/models/work.model';
import { WorkService } from 'src/app/services/work.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  work: Work;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private workService: WorkService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.work = { id: 0, name: '', location: '', combo_id: 0 };
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
      this.work.id = this.activateRoute.snapshot.params.id;
      this.getWork(this.work.id);
    }
  }

  getWork(id: number) {
    this.workService.view(id).subscribe({
      next: (work) => {
        this.work = work;
        console.log('Work fetched successfully:', this.work);
      },
      error: (error) => {
        console.error('Error fetching work:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      combo_id: [0, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/works/list']);
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
    this.workService.create(this.work).subscribe({
      next: (work) => {
        console.log('Work created successfully:', work);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro de trabajo creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/works/list']);
      },
      error: (error) => {
        console.error('Error creating work:', error);
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
    this.workService.update(this.work).subscribe({
      next: (work) => {
        console.log('Work updated successfully:', work);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro de trabajo actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/works/list']);
      },
      error: (error) => {
        console.error('Error updating work:', error);
      }
    });
  }
}
