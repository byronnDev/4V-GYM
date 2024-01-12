import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, MatNativeDateModule],
  template: `
  <div class="flex justify-around top-0">
      <mat-card class="demo-inline-calendar-card">
        <mat-calendar [(selected)]="selected"></mat-calendar>
      </mat-card>
      <p>Selected date: {{selected}}</p>
  </div>
  `,
  styles: `
  .demo-inline-calendar-card {
    width: 300px;
  }
  `
})
export class ActivitiesComponent {
  selected: Date | null;

  constructor() {
    this.selected = null;
  }
}
