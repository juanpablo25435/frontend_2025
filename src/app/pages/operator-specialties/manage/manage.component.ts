import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Importa tus modelos y servicios nuevos
import { OperatorSpecialty } from 'src/app/models/operator-specialty.model';
import { OperatorSpecialtyService } from 'src/app/services/operator-specialty.service';
import { OperatorService } from 'src/app/services/operator.service';
import { SpecialtyService } from 'src/app/services/specialty.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  operatorSpecialty: OperatorSpecialty;
  theFormGroup: FormGroup;
  trySend: boolean;

  operators: any[] = [];   // Lista de operadores para el select
  specialties: any[] = []; // Lista de especialidades para el select

  constructor(
    private activateRoute: ActivatedRoute,
    private operatorSpecialtyService: OperatorSpecialtyService,
    private operatorService: OperatorService,
    private specialtyService: SpecialtyService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.operatorSpecialty = { id: 0, operator_id: null, specialty_id: null };
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

    this.loadOperators();
    this.loadSpecialties();

    if (this.activateRoute.snapshot.params.id) {
      this.operatorSpecialty.id = this.activateRoute.snapshot.params.id;
      this.getOperatorSpecialty(this.operatorSpecialty.id);
    }
  }

  // Cargar operadores para el select
  loadOperators() {
    this.operatorService.list().subscribe({
      next: (data) => this.operators = data,
      error: (error) => console.error('Error loading operators:', error)
    });
  }

  // Cargar especialidades para el select
  loadSpecialties() {
    this.specialtyService.list().subscribe({
      next: (data) => this.specialties = data,
      error: (error) => console.error('Error loading specialties:', error)
    });
  }

  getOperatorSpecialty(id: number) {
    this.operatorSpecialtyService.view(id).subscribe({
      next: (data) => {
        this.operatorSpecialty = data;
        // Actualizar valores del formulario con datos cargados
        this.theFormGroup.patchValue({
          operator_id: this.operatorSpecialty.operator_id,
          specialty_id: this.operatorSpecialty.specialty_id
        });
      },
      error: (error) => {
        console.error('Error fetching operator specialty:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      operator_id: [null, Validators.required],
      specialty_id: [null, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/operator-specialties/list']);
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

    this.operatorSpecialtyService.create(this.operatorSpecialty).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/operator-specialties/list']);
      },
      error: (error) => {
        console.error('Error creating operator specialty:', error);
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

    this.operatorSpecialtyService.update(this.operatorSpecialty).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/operator-specialties/list']);
      },
      error: (error) => {
        console.error('Error updating operator specialty:', error);
      }
    });
  }
}
