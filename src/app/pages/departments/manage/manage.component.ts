import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  department: Department;
  theFormGroup: FormGroup;
  trySend: boolean

  constructor(
    private activateRoute: ActivatedRoute,
    private departmentService: DepartmentService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.department = { id: 0 };
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
      this.department.id = this.activateRoute.snapshot.params.id;
      this.getDepartment(this.department.id);
    }
  }

  getDepartment(id: number) {
    this.departmentService.view(id).subscribe({
      next: (department) => {
        this.department = department;
        console.log('Department fetched successfully:', this.department);
      },
      error: (error) => {
        console.error('Error fetching department:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // Ajusta los campos según el modelo Department
      name: ['', [Validators.required, Validators.minLength(2), Validators.max(100)]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/departments/list']);
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
    this.departmentService.create(this.department).subscribe({
      next: (department) => {
        console.log('Department created successfully:', department);
        Swal.fire({
          title: 'Creado!',
          text: 'Registro creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/departments/list']);
      },
      error: (error) => {
        console.error('Error creating department:', error);
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
    this.departmentService.update(this.department).subscribe({
      next: (department) => {
        console.log('Department updated successfully:', department);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Registro actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/departments/list']);
      },
      error: (error) => {
        console.error('Error updating department:', error);
      }
    });
  }
}