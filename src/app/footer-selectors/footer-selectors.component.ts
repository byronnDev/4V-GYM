import { Component } from '@angular/core';
import { MonitorsComponent } from '../monitors/monitors.component';
import { ActivitiesModule } from '../activities/activities.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-footer-selectors',
  standalone: true,
  imports: [MonitorsComponent, ActivitiesModule, MatTabsModule, MatIconModule],
  template: `
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <footer class="fixed bottom-0 left-0 w-full">
      <mat-tab-group headerPosition="below">
          <mat-tab>
            <ng-template mat-tab-label>
            <span class="material-symbols-outlined mr-2">
              calendar_clock
            </span>
              Actividades
            </ng-template>
            <app-activities></app-activities>
          </mat-tab>

          <mat-tab>
            <ng-template mat-tab-label>
              <span class="material-symbols-outlined mr-2">person</span>
              Monitores
            </ng-template>
            <app-monitors></app-monitors>
          </mat-tab>
      </mat-tab-group>
  </footer>
`,
  styles: ``
})
export class FooterSelectorsComponent {

}
