import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
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
            @for (activity of activites; track $index) {
              <tr>
                <td class="bg-white">
                  <p>{{horas[$index]}}</p>
                </td>
                <!-- <td class="bg-green-500" colspan="3">
                    <p class="text-center">FREE</p>
                </td> -->
                <td>Monitores</td>
                <td>Actividad</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
  `,
  styles: `
  .demo-inline-calendar-card {
    width: 300px;
  }
  `
})
export class ActivitiesComponent {
  selected: Date | null = null;
  horas = ['10:00 11:30',
    '13:30 15:00',
    '17:30 19:00',
  ]
  activites: Activity[] = [];

  constructor() {
  }
}
