import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.list().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Users fetched successfully:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/users/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/users/update', id]);
  }

  create() {
    this.router.navigate(['/users/create']);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'Usuario eliminado correctamente.', 'success');
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario: ' + error.message, 'error');
          }
        });
      }
    });
  }
}
