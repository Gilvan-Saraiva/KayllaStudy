import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../services/material.service';
import { UserService } from '../services/user.service';
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
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.userService.getAlunos().subscribe(
      (alunos) => {
        this.alunos = alunos;
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
