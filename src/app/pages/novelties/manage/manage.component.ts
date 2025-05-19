import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Novelty } from 'src/app/models/novelty.model';
import { NoveltyService } from 'src/app/services/novelty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  novelty: Novelty;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private noveltyService: NoveltyService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.novelty = { id: 0, novelty_description: '', shift_id: 0 };
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
      this.novelty.id = this.activateRoute.snapshot.params.id;
      this.getNovelty(this.novelty.id);
    }
  }

  getNovelty(id: number) {
    this.noveltyService.view(id).subscribe({
      next: (novelty) => {
        this.novelty = novelty;
        console.log('Novelty fetched successfully:', this.novelty);
      },
      error: (error) => {
        console.error('Error fetching novelty:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      novelty_description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      shift_id: [null, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/novelties/list']);
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
    this.noveltyService.create(this.novelty).subscribe({
      next: (novelty) => {
        console.log('Novelty created successfully:', novelty);
        Swal.fire({
          title: 'Creado!',
          text: 'Novedad creada correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/novelties/list']);
      },
      error: (error) => {
        console.error('Error creating novelty:', error);
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
    this.noveltyService.update(this.novelty).subscribe({
      next: (novelty) => {
        console.log('Novelty updated successfully:', novelty);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Novedad actualizada correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/novelties/list']);
      },
      error: (error) => {
        console.error('Error updating novelty:', error);
      }
    });
  }
}
