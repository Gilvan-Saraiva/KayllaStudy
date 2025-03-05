import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MaterialService } from '../services/material.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './controle.component.html',
  styleUrl: './controle.component.css',
})
export class ControleComponent implements OnInit {
  usuarios: any[] = [];
  alunos: any[] = [];
  materiais: any[] = [];
  selectedAlunos: string[] = [];

  constructor(
    private userService: UserService,
    private materialService: MaterialService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getAlunos();
    this.getTodosMateriais();

  }

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

  updateUserRole(email: string) {
    this.userService.updateUserToAluno(email).subscribe(
      () => {
        alert('Usuário atualizado para aluno com sucesso!');
        this.getUsers();
        this.getAlunos();
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
        alert('Erro ao atualizar usuário.');
      }
    );
  }

  getTodosMateriais() {
    this.materialService.getTodosMateriais().subscribe({
      next: (materiais) => {
        console.log('Materiais recebidos:', materiais);
        this.materiais = materiais.payload || materiais; // Verifica a estrutura do retorno
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar materiais:', error);
        alert('Erro ao carregar materiais.');
      },
    });
  }

  deleteMaterial(materialId: string) {
    if (confirm('Tem certeza que deseja excluir este material?')) {
      this.materialService.deleteMaterial(materialId).subscribe(
        () => {
          alert('Material deletado com sucesso!');
          this.materiais = this.materiais.filter(m => m._id !== materialId);
          this.cdRef.detectChanges();
        },
        (error) => {
          console.error('Erro ao deletar material:', error);
          alert('Erro ao deletar material.');
        }
      );
    }
  }
}
