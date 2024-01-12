import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalApiService, Activity, ActivityType, Monitors } from '../global-api.service';

@Component({
  selector: 'app-activities',
  template: `
      <!-- Calendar -->
      <div class="absolute top-0 left-0">
        <mat-card class="demo-inline-calendar-card">
          <mat-calendar [(selected)]="selected"></mat-calendar>
        </mat-card>
        <p>Selected date: {{selected}}</p>
      </div>

      <!-- List dates -->
      <div class="flex justify-center items-center h-screen">
        <table class="bg-neutral-400">
          <tbody>
            <tr>
                <td class="bg-white">
                  <p>{{hours[0]}}</p>
                </td>
                <td>Monitores</td>
                <td>Actividad</td>
              </tr>
          </tbody>
        </table>
      </div>
  `,
})
export class ActivitiesComponent {
  selected: Date | null = null;
  hours = ['10:00 11:30', '13:30 15:00', '17:30 19:00'];
  activites: Activity[] = [];
  activityTypes: ActivityType[] = [];
  monitors: Monitors[] = [];

  constructor(private globalApi: GlobalApiService) {
    this.activites = this.globalApi.activities;
    this.activityTypes = this.globalApi.activityTypes;
    this.monitors = this.globalApi.monitors;
  }
}

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  providers: [GlobalApiService],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }