import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MaterialService } from '../services/material.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postar.component.html',
  styleUrls: ['./postar.component.css']
})
export class PostarComponent implements OnInit {
  material = {
    titulo: '',
    descricao: '',
    youtubeURL: '',
    pdfs: [] as File[]
  };

  usuarios: any[] = []; // Para a lista de "Selecionar Usuário para Aluno"
  alunos: any[] = [];   // Para a lista de "Selecione os Usuários"
  selectedAlunos: string[] = [];

  constructor(
    private userService: UserService,
    private materialService: MaterialService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.getAlunos();
  }

  // Busca todos os usuários (para transformar em alunos)
  getUsers() {
    this.userService.getUsers('void').subscribe({
      next: (users) => {
        console.log('Usuários recebidos:', users);
        this.usuarios = users.payload || users;
        this.cdRef.detectChanges();
      },
      error: (error) => console.error('Erro ao buscar usuários:', error),
    });
  }

  // Busca os alunos já cadastrados (para a postagem de material)
  getAlunos() {
    this.userService.getAlunos().subscribe({
      next: (alunos) => {
        console.log('Alunos recebidos:', alunos);
        this.alunos = alunos.payload || alunos;
        this.cdRef.detectChanges();
      },
      error: (error) => console.error('Erro ao buscar alunos:', error),
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.material.pdfs = Array.from(input.files);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.material.titulo);
    formData.append('description', this.material.descricao);

    const youtubeURLs = this.material.youtubeURL
      ? this.material.youtubeURL.split(',').map(url => url.trim()).filter(url => url)
      : [];
    youtubeURLs.forEach(url => formData.append('youtubeURL', url));

    this.material.pdfs.forEach((pdf) => {
      formData.append('pdfFiles', pdf, pdf.name);
    });

    formData.append('usersId', this.selectedAlunos.join(','));

    this.materialService.postMaterial(formData).subscribe(
      () => {
        alert('Material postado com sucesso!');
      },
      (error) => {
        console.error('Erro ao postar material:', error);
        alert('Erro ao postar material.');
      }
    );
  }

  updateUserRole(email: string) {
    this.userService.updateUserToAluno(email).subscribe(
      () => {
        alert('Usuário atualizado para aluno com sucesso!');
        this.getUsers(); // Atualiza a lista de usuários
        this.getAlunos(); // Atualiza a lista de alunos
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário.');
      }
    );
  }
}
