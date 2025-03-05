import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  messages: any[] = [];
  messageContent: string = '';
  userId: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser) {
      this.userId = currentUser.user.id; // Pega o ID do usuário logado
      this.loadMessages();
    }
  }

  // Carrega as mensagens do chat
  loadMessages() {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  // Envia uma nova mensagem
  sendMessage() {
    if (this.messageContent.trim() && this.userId) {
      this.chatService.sendMessage(this.userId, this.messageContent).subscribe(() => {
        this.loadMessages(); // Atualiza o chat
        this.messageContent = ''; // Limpa o campo de mensagem
      });
    }
  }
}
