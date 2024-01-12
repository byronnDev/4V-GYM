import { Component } from '@angular/core';
import { MonitorsComponent } from '../monitors/monitors.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-footer-selectors',
  standalone: true,
  imports: [MonitorsComponent, ActivitiesComponent, MatTabsModule],
  template: `
    <footer class="fixed bottom-0 left-0 w-full">
      <mat-tab-group headerPosition="below">
          <mat-tab label="Actividades">
              <app-activities></app-activities>
          </mat-tab>
          <mat-tab label="Monitores">
              <app-monitors></app-monitors>
          </mat-tab>
      </mat-tab-group>
  </footer>
`,
  styles: ``
})
export class FooterSelectorsComponent {

}
