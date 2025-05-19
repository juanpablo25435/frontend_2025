import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboMachine } from 'src/app/models/combo-machine.model';
import { ComboMachineService } from 'src/app/services/combo-machine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  comboMachine: ComboMachine;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private comboMachineService: ComboMachineService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.comboMachine = { 
      id: 0, 
      machine_id: 0,
      combo_id: 0
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
      this.comboMachine.id = this.activateRoute.snapshot.params.id;
      this.getComboMachine(this.comboMachine.id);
    }
  }

  getComboMachine(id: number) {
    this.comboMachineService.view(id).subscribe({
      next: (comboMachine) => {
        this.comboMachine = comboMachine;
        console.log('Combo Machine fetched successfully:', this.comboMachine);
      },
      error: (error) => {
        console.error('Error fetching combo machine:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      machine_id: [0, [Validators.required]],
      combo_id: [0, [Validators.required]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/combo-machines/list']);
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
    this.comboMachineService.create(this.comboMachine).subscribe({
      next: (comboMachine) => {
        console.log('Combo Machine created successfully:', comboMachine);
        Swal.fire({
          title: 'Creado!',
          text: 'Combo de máquina creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/combo-machines/list']);
      },
      error: (error) => {
        console.error('Error creating combo machine:', error);
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
    this.comboMachineService.update(this.comboMachine).subscribe({
      next: (comboMachine) => {
        console.log('Combo Machine updated successfully:', comboMachine);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Combo de máquina actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/combo-machines/list']);
      },
      error: (error) => {
        console.error('Error updating combo machine:', error);
      }
    });
  }
}