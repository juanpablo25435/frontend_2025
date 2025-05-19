import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Operator } from 'src/app/models/operator.model';
import { OperatorService } from 'src/app/services/operator.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  operator: Operator;
  theFormGroup: FormGroup;
  trySend: boolean;
  users: User[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private operatorService: OperatorService,
    private userService: UserService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.operator = { id: 0, name: '', operator_id: 0, user_id: 0 };
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

    this.loadUsers();

    if (this.activateRoute.snapshot.params.id) {
      this.operator.id = +this.activateRoute.snapshot.params.id;
      this.getOperator(this.operator.id);
    }
  }

  loadUsers() {
    this.userService.list().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  getOperator(id: number) {
    this.operatorService.view(id).subscribe({
      next: (operator) => {
        this.operator = operator;
        this.theFormGroup.patchValue({
          name: operator.name,
          operator_id: operator.operator_id,
          user_id: operator.user_id,
        });
      },
      error: (error) => {
        console.error('Error fetching operator:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      operator_id: [0, [Validators.required, Validators.min(1)]],
      user_id: [null, [Validators.required]],
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/operators/list']);
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

    this.operator = {
      ...this.operator,
      ...this.theFormGroup.value
    };

    this.operatorService.create(this.operator).subscribe({
      next: () => {
        Swal.fire({
          title: 'Creado!',
          text: 'Operador creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/operators/list']);
      },
      error: (error) => {
        console.error('Error creating operator:', error);
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

    this.operator = {
      ...this.operator,
      ...this.theFormGroup.value
    };

    this.operatorService.update(this.operator).subscribe({
      next: () => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Operador actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/operators/list']);
      },
      error: (error) => {
        console.error('Error updating operator:', error);
      }
    });
  }
}
