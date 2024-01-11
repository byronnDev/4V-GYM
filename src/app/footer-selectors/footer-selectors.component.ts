import { Component } from '@angular/core';
import { MonitorsComponent } from '../monitors/monitors.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-footer-selectors',
  standalone: true,
  imports: [MonitorsComponent, ActivitiesComponent, MatTabsModule],
  templateUrl: './footer-selectors.component.html',
  styleUrl: './footer-selectors.component.scss'
})
export class FooterSelectorsComponent {

}
