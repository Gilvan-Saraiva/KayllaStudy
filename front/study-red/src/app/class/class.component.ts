import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-class',
  standalone: true,
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const videoId = 'k3FJJimIpQ8'; // ID do vídeo extraído da URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }
}
