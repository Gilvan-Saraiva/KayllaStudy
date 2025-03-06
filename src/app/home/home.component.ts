import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  isLoggedIn: boolean = false;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: any, private router: Router, private authService: AuthService) {}
  redirectToRegister() {
  console.log('Botão clicado!'); // Verifique se essa mensagem aparece no console
  this.router.navigate(['/register']);

}
isAuthenticated(): boolean {
  return this.authService.isAuthenticated();
}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        const captions = document.querySelectorAll('.carousel-caption');
        captions.forEach(caption => {
          caption.addEventListener('click', () => {
            const text = caption.querySelector('.truncate-text') as HTMLElement | null;
            const readMore = caption.querySelector('.read-more') as HTMLElement | null;
            const readLess = caption.querySelector('.read-less') as HTMLElement | null;

            if (text && readMore && readLess) {
              text.classList.toggle('expanded');
              readMore.style.display = text.classList.contains('expanded') ? 'none' : 'block';
              readLess.style.display = text.classList.contains('expanded') ? 'block' : 'none';
            }
          });
        });
      });
    }
  }
}
