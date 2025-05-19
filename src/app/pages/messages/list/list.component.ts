import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  messages: Message[] = [];

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.messageService.list().subscribe({
      next: (messages) => {
        this.messages = messages;
        console.log('Messages fetched successfully:', this.messages);
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    });
  }

  view(id: number) {
    this.router.navigate(['/messages/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/messages/update', id]);
  }

  create() {
    this.router.navigate(['/messages/create']);
  }

  delete(id: number) {
    console.log("Delete message with id:", id);
    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro que quiere eliminar el registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messageService.delete(id).subscribe({
          next: (data) => {
            Swal.fire(
              '¡Eliminado!',
              'Registro eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el mensaje: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}