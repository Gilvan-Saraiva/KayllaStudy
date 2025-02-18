import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
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
