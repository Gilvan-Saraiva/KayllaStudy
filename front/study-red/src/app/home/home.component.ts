import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, NgZone, PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.ngZone.runOutsideAngular(() => {
          const elements = document.querySelectorAll('.collapsible-caption');
          elements.forEach((element) => {
            element.addEventListener('click', function (this: HTMLElement) {
              this.classList.toggle('expanded');
            });
          });
        });
      }, 100);
    }
  }
}
