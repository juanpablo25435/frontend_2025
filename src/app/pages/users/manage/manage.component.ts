import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: User;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.user = { id: 0, username: '', email: '' };
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
      this.user.id = this.activateRoute.snapshot.params.id;
      this.getUser(this.user.id);
    }
  }

  getUser(id: number) {
    this.userService.view(id).subscribe({
      next: (user) => {
        this.user = user;
        console.log('User fetched successfully:', this.user);
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/users/list']);
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

    this.userService.create(this.user).subscribe({
      next: (user) => {
        console.log('User created successfully:', user);
        Swal.fire({
          title: 'Creado!',
          text: 'Usuario creado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/users/list']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
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

    this.userService.update(this.user).subscribe({
      next: (user) => {
        console.log('User updated successfully:', user);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Usuario actualizado correctamente.',
          icon: 'success'
        });
        this.router.navigate(['/users/list']);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }
}
