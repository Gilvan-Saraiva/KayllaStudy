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
  styleUrl: './postar.component.css'
})
export class PostarComponent implements OnInit {
  material = {
    titulo: '',
    descricao: '',
    youtubeLinks: '',
    pdfs: [] as File[]
  };
  alunos: any[] = [];
  selectedAlunos: string[] = [];

  constructor(
    private userService: UserService,
    private materialService: MaterialService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef // Força a atualização da tela
  ) {}

  ngOnInit() {
    this.userService.getAlunos().subscribe(
      (response) => {
        console.log('Dados recebidos:', response); // Debug
        this.alunos = response.payload || response; // Ajuste conforme o backend
        this.cdRef.detectChanges(); // Força atualização do Angular
      },
      (error) => {
        console.error('Erro ao buscar alunos:', error);
      }
    );
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.material.pdfs = Array.from(input.files);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('titulo', this.material.titulo);
    formData.append('descricao', this.material.descricao);
    formData.append('youtubeLinks', this.material.youtubeLinks);
    this.material.pdfs.forEach((pdf) => {
      formData.append('pdfs', pdf, pdf.name);
    });
    formData.append('alunos', JSON.stringify(this.selectedAlunos));

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
}
