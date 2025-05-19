import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2->Create, 3->Update
  chat: Chat;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.chat = { id: 0 };
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
      this.chat.id = +this.activateRoute.snapshot.params.id;
      this.getChat(this.chat.id);
    }
  }

  getChat(id: number) {
    this.chatService.view(id).subscribe({
      next: (chat) => {
        this.chat = chat;
        this.theFormGroup.patchValue({
          id: chat.id
        });
      },
      error: (error) => {
        console.error('Error fetching chat:', error);
      }
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [0, [Validators.required, Validators.min(1)]]
    });
  }

  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  back() {
    this.router.navigate(['/chats/list']);
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

    this.chat = {
      ...this.theFormGroup.value
    };

    this.chatService.create(this.chat).subscribe({
      next: (chat) => {
        Swal.fire({
          title: 'Creado!',
          text: 'Chat creado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/chats/list']);
      },
      error: (error) => {
        console.error('Error creating chat:', error);
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

    this.chat = {
      ...this.theFormGroup.value
    };

    this.chatService.update(this.chat).subscribe({
      next: (chat) => {
        Swal.fire({
          title: 'Actualizado!',
          text: 'Chat actualizado correctamente.',
          icon: 'success',
        });
        this.router.navigate(['/chats/list']);
      },
      error: (error) => {
        console.error('Error updating chat:', error);
      }
    });
  }
}
