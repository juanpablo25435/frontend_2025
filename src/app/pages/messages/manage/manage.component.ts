import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  message: Message;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.message = { 
      id: 0, 
      user_id: 0,
      chat_id: 0,
      message: ''
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
      this.message.id = this.activateRoute.snapshot.params.id;
      this.getMessage(this.message.id);
    }
  }

  getMessage(id: number) {
    this.messageService.view(id).subscribe({
      next: (message) => {
        this.message = message;
        console.log('Message fetched successfully:', this.message);
      },
      error: (error) => {
        console.error('Error fetching message:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: [0, [Validators.required]],
      chat_id: [0, [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/messages/list']);
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
    this.messageService.create(this.message).subscribe({
      next: (message) => {
        console.log('Message created successfully:', message);
        Swal.fire({
          title: 'Creado!',
          text: 'Mensaje creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/messages/list']);
      },
      error: (error) => {
        console.error('Error creating message:', error);
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
    this.messageService.update(this.message).subscribe({
      next: (message) => {
        console.log('Message updated successfully:', message);
        Swal.fire({
          title: 'Actualizado!',
          text: 'Mensaje actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/messages/list']);
      },
      error: (error) => {
        console.error('Error updating message:', error);
      }
    });
  }
}