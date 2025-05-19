import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComboMachine } from 'src/app/models/combo-machine.model'; // Define este modelo según tus atributos
import { ComboMachineService } from 'src/app/services/combo-machine.service';
import { Combo } from 'src/app/models/combo.model';
import { ComboService } from 'src/app/services/combo.service';
import { Machine } from 'src/app/models/machine.model';
import { MachineService } from 'src/app/services/machine.service';
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
  trySend: boolean = false;
  combos: Combo[] = [];
  machines: Machine[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private comboMachineService: ComboMachineService,
    private comboService: ComboService,
    private machineService: MachineService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.comboMachine = { id: 0, combo_id: 0, machine_id: 0 };
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

    this.loadCombos();
    this.loadMachines();

    if (this.activateRoute.snapshot.params.id) {
      this.comboMachine.id = +this.activateRoute.snapshot.params.id;
      this.getComboMachine(this.comboMachine.id);
    }
  }

  configFormGroup() {
    this.theFormGroup = this.formBuilder.group({
      combo_id: [null, Validators.required],
      machine_id: [null, Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  loadCombos() {
    this.comboService.list().subscribe({
      next: (data) => this.combos = data,
      error: (err) => console.error('Error loading combos', err)
    });
  }

  loadMachines() {
    this.machineService.list().subscribe({
      next: (data) => this.machines = data,
      error: (err) => console.error('Error loading machines', err)
    });
  }

  getComboMachine(id: number) {
    this.comboMachineService.view(id).subscribe({
      next: (data) => {
        this.comboMachine = data;
        this.theFormGroup.patchValue({
          combo_id: data.combo_id,
          machine_id: data.machine_id
        });
      },
      error: (err) => console.error('Error fetching comboMachine', err)
    });
  }

  back() {
    this.router.navigate(['/combo-machine/list']);
  }

  create() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos.', 'error');
      return;
    }

    this.comboMachine = {
      ...this.comboMachine,
      ...this.theFormGroup.value
    };

    this.comboMachineService.create(this.comboMachine).subscribe({
      next: () => {
        Swal.fire('Creado', 'Registro creado correctamente.', 'success');
        this.router.navigate(['/combo-machine/list']);
      },
      error: (err) => console.error('Error creando comboMachine', err)
    });
  }

  update() {
    this.trySend = true;
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos.', 'error');
      return;
    }

    this.comboMachine = {
      ...this.comboMachine,
      ...this.theFormGroup.value
    };

    this.comboMachineService.update(this.comboMachine).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Registro actualizado correctamente.', 'success');
        this.router.navigate(['/combo-machine/list']);
      },
      error: (err) => console.error('Error actualizando comboMachine', err)
    });
  }
}
