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
    youtubeURL: '', // Alinhado com o nome do campo no template
    pdfs: [] as File[]
  };
  alunos: any[] = [];
  selectedAlunos: string[] = [];

  constructor(
    private userService: UserService,
    private materialService: MaterialService,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.getAlunos().subscribe(
      (response) => {
        console.log('Dados recebidos:', response);
        // Ajusta conforme a estrutura do retorno do backend
        this.alunos = response.payload || response;
        this.cdRef.detectChanges();
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
    formData.append('title', this.material.titulo);
    formData.append('description', this.material.descricao);

    // Converter a string de links do YouTube em array, se houver valor,
    // e enviar cada link separadamente para que o backend os interprete como array.
    const youtubeURLs = this.material.youtubeURL
      ? this.material.youtubeURL.split(',').map(url => url.trim()).filter(url => url)
      : [];
    youtubeURLs.forEach(url => formData.append('youtubeURL', url));

    // Anexa os arquivos PDF
    this.material.pdfs.forEach((pdf) => {
      formData.append('pdfFiles', pdf, pdf.name);
    });

    // Envia os IDs dos usuários como string separada por vírgulas
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
}
