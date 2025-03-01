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
  videoUrls: SafeResourceUrl[] = [];

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
      this.videoUrls = materiais.flatMap((m: any) =>
        m.youtubeURL.map((url: string) =>
          this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${url}`)
        )
      );
    });
  }
}
