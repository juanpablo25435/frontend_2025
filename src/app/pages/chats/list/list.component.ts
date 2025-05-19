import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat.model';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  chats: Chat[] = [];

  constructor(
    private chatService: ChatService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.chatService.list().subscribe({
      next: (chats) => {
        this.chats = chats;
        console.log('Chats fetched successfully:', this.chats);
      },
      error: (error) => {
        console.error('Error fetching chats:', error);
      },
    });
  }

  view(id: number) {
    this.router.navigate(['/chats/view', id]);
  }

  edit(id: number) {
    this.router.navigate(['/chats/update', id]);
  }

  create() {
    this.router.navigate(['/chats/create']);
  }

  delete(id: number) {
    console.log("Delete chat with id:", id);
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
        this.chatService.delete(id).subscribe({
          next: () => {
            Swal.fire(
              '¡Eliminado!',
              'Chat eliminado correctamente.',
              'success'
            );
            this.ngOnInit();
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'No se pudo eliminar el chat: ' + error.message,
              'error'
            );
          }
        });
      }
    });
  }
}
