import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { MaterialService } from '../services/material.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class',
  standalone: true,
  templateUrl: './class.component.html',
  styleUrl: './class.component.css',
  imports: [FormsModule, CommonModule]
})
export class ClassComponent implements OnInit {
  materiais: any[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.carregarMateriais(user.user.id);
    }
  }

  carregarMateriais(userId: string): void {
    this.materialService.getMateriaisPorUsuario(userId).subscribe(materiais => {
      this.materiais = materiais;
    });
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
  downloadPdf(pdf: any): void {
    let blob: Blob;

    // Se o PDF for um objeto Buffer (geralmente { type: 'Buffer', data: [...] })
    if (pdf && pdf.data && Array.isArray(pdf.data)) {
      const byteArray = new Uint8Array(pdf.data);
      blob = new Blob([byteArray], { type: 'application/pdf' });
    }
    // Se o PDF já vier como uma string base64
    else if (typeof pdf === 'string') {
      const byteCharacters = atob(pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: 'application/pdf' });
    } else {
      console.error('Formato de PDF não reconhecido.');
      return;
    }

    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }
}

