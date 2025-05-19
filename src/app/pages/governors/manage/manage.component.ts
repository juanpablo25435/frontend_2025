import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Governor } from 'src/app/models/governor.model';
import { GovernorService } from 'src/app/services/governor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1 -> Ver, 2 -> Crear, 3 -> Actualizar
  governor: Governor;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private governorService: GovernorService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.governor = { id: 0, name: '', department_id: 0, user_id: 0 };
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
      const id = +this.activateRoute.snapshot.params.id;
      this.getGovernor(id);
    }
  }

  getGovernor(id: number) {
    this.governorService.view(id).subscribe({
      next: (g) => {
        this.governor = g;
        console.log('Governor fetched:', this.governor);
      },
      error: (err) => {
        console.error('Error fetching governor:', err);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      department_id: [0, Validators.required],
      user_id: [0, Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/governors/list']);
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos correctamente.',
        icon: 'error'
      });
      return;
    }

    this.governorService.create(this.governor).subscribe({
      next: (res) => {
        console.log('Governor created:', res);
        Swal.fire('¡Creado!', 'Gobernador registrado correctamente.', 'success');
        this.router.navigate(['/governors/list']);
      },
      error: (err) => {
        console.error('Error creating governor:', err);
        Swal.fire('Error', 'No se pudo crear el gobernador.', 'error');
      }
    });
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos correctamente.',
        icon: 'error'
      });
      return;
    }

    this.governorService.update(this.governor).subscribe({
      next: (res) => {
        console.log('Governor updated:', res);
        Swal.fire('¡Actualizado!', 'Gobernador actualizado correctamente.', 'success');
        this.router.navigate(['/governors/list']);
      },
      error: (err) => {
        console.error('Error updating governor:', err);
        Swal.fire('Error', 'No se pudo actualizar el gobernador.', 'error');
      }
    });
  }
}
