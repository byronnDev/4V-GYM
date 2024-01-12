import { Component, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalApiService, Activity, ActivityType, Monitors } from '../global-api.service';

@Component({
  selector: 'app-activities',
  template: `
      <!-- Calendar -->
      <div class="fixed top-1/4 left-16">
        <mat-card class="demo-inline-calendar-card">
          <mat-calendar [(selected)]="selected"></mat-calendar>
        </mat-card>
      </div>
      
      <!-- List dates -->
      <div class="flex text-3xl flex-col justify-center items-center h-screen">
        <div class="flex flex-row mb-10">
            <button (click)="restarDia()">
            <img class="h-16" src="../../assets/flechas.png" alt="flecha">
            </button>
          <p class="text-4xl">{{selected.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
          <button (click)="sumarDia()">
            <img class="h-16 rotate-180" src="../../assets/flechas.png" alt="flecha">
          </button>
        </div>
        <table class="bg-neutral-300">
          <tbody>
            @for (activity of activites; track $index) {
            <tr>
                <td class="bg-white">
                  <p>{{hours[$index]}}</p>
                </td>
                <td>Monitores</td>
                <td>Actividad</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
  `,
})
export class ActivitiesComponent {
  selected: Date = new Date();
  hours = ['10:00 11:30', '13:30 15:00', '17:30 19:00'];
  activites: Activity[] = [];
  activityTypes: ActivityType[] = [];
  monitors: Monitors[] = [];

  constructor(private globalApi: GlobalApiService) {
    this.activites = this.globalApi.activities;
    this.activityTypes = this.globalApi.activityTypes;
    this.monitors = this.globalApi.monitors;
  }

  sumarDia() {
    this.selected.setDate(this.selected.getDate() + 1);
  }
  restarDia() {
    this.selected.setDate(this.selected.getDate() - 1);
  }
}

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  providers: [GlobalApiService],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }