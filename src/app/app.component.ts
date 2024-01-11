import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ActivitiesComponent } from './activities/activities.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { FooterSelectorsComponent } from './footer-selectors/footer-selectors.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,FooterSelectorsComponent],
  template: `
  <app-header></app-header>
  <app-footer-selectors></app-footer-selectors>
  `,
  styles: 
  `
  
  `
})
export class AppComponent {
  title = '4V-GYM';
}
