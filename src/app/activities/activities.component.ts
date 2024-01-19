import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalApiService, Activity, ActivityType, Monitors } from '../global-api.service';
import { FormsModule } from '@angular/forms';

//!! TODO: Add Modal to add activity and monitors

@Component({
  selector: 'app-activities',
  template: `
      <!-- Calendar -->
      <div class="fixed top-1/4 left-16">
        <mat-card class="demo-inline-calendar-card">
          <mat-calendar [(selected)]="selected"></mat-calendar>
        </mat-card>
      </div>
      
      <!-- Activities -->
      <div class="flex text-3xl flex-col justify-center items-center h-screen">
        <div class="flex flex-row mb-10">
            <button (click)="restarDia()">
              <img class="h-16" src="../../assets/flechas.png" alt="flecha">
            </button>
            <!-- Date -->
              <p class="pt-2 text-4xl text-neutral-500 font-mono">{{selected.toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })}}</p>
            <button (click)="sumarDia()">
              <img class="h-16 rotate-180" src="../../assets/flechas.png" alt="flecha">
            </button>
        </div>
        <!-- Table -->
        <table class="bg-neutral-300 w-2/5">
          <tbody>
            @for (activity of activites; track $index) {
              @if (activity.date_start.toDateString() === selected.toDateString()) {
                <tr>
                  <td class="bg-white w-1/3">
                    <p>{{hours[$index]}}</p>
                  </td>
                <td class="bg-gray-300 h-32 relative" [ngClass]="{'bg-green-700': !activity.monitors.length}">
                @if (activity.monitors.length) {
                    <div class="flex items-center">
                      @if (activity.monitors.length == 2) {
                        @for (monitor of activity.monitors; track $index) {
                            <div class="flex flex-col items-center">
                              <img class="h-24" src="../../assets/bi_person-fill.png" alt="person">
                              <p class="text-custom-red text-lg">{{ monitor.name }}</p>
                            </div>
                        }
                      } @else {
                        @for (monitor of activity.monitors; track $index){
                          <div class="flex flex-col items-center">
                            <img class="h-24" src="../../assets/bi_person-fill.png" alt="person">
                            <p class="text-custom-red text-lg">{{ monitor.name }}</p>
                          </div>
                        }
                        <div class="flex flex-col items-center w-24"></div>
                      }
                      <div class="ml-auto mr-auto">
                        <img src="../../assets/{{activity.activityType.name}}.png" alt="Imagen de {{activity.activityType.name}}"
                          class="w-24 h-24">
                      </div>
                      </div>
                      <button class="absolute top-0 right-0 mt-2 mr-2 text-xl text-bold text-amber-700"
                        (click)="removeActivity(activity)">
                        <img src="../../assets/ph_trash-fill.png" alt="remove">
                      </button>
                      <button class="absolute bottom-0 right-0 mb-2 mr-2 text-xl text-bold text-amber-700"
                        (click)="loadMonitor(activity, hours[$index].split(' ')[0])">
                        <img src="../../assets/ic_round-edit.png" alt="edit">
                      </button>
                    } @else {
                      <div class="flex justify-center items-center h-full text-white font-bold">
                        FREE
                        <button class="absolute top-0 right-0 mt-2 mr-2 text-xl text-bold text-amber-700"
                          (click)="openModal(hours[$index].split(' ')[0])">
                          <img src="../../assets/mingcute_add-fill.png" alt="add">
                        </button>
                      </div>
                    }
                  </td>
                </tr>
              } @else {
                <tr>
                  <td class="bg-white w-1/3">
                    <p>{{hours[$index]}}</p>
                  </td>
                  <td class="bg-green-700 h-32 relative">
                    <div class="flex justify-center items-center h-full text-white font-bold">
                      FREE
                      <button class="absolute top-0 right-0 mt-2 mr-2 text-xl text-bold text-amber-700"
                        (click)="openModal(hours[$index].split(' ')[0])">
                        <img src="../../assets/mingcute_add-fill.png" alt="add">
                      </button>
                    </div>
                  </td>
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

    <!-- Modal -->
    @if (isModalOpen) {
    <div class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-70 transition backdrop-filter 
      backdrop-saturate-150 backdrop-blur-sm duration-300 ease-in-out">
      <div class="fixed inset-y-0 z-50 w-1/2 h-auto overflow-y-auto
          overflow-x-hidden bg-white rounded shadow-lg m-20">

        <div class="flex items-center justify-center">
          <div>
            <!-- Modal header -->
            <div class="flex relative">
              <img src="../assets/bi_person-fill.png" alt="person icon" class="mx-auto mt-4">
              <img src="../assets/mingcute_add-fill.png" alt="person icon" class="absolute bottom-7 right-14 h-8">
            </div>
            <!-- Modal body -->
            <div class="flex flex-col space-y-4">
              <!-- Name -->
              <select class="bg-neutral-300 text-3xl text-custom-red font-bold rounded-2xl">
                <option *ngFor="let type of activityTypes">{{type.name}}</option>
              </select>

              <!-- Accept and cancel buttons -->
              <div class="flex justify-between space-x-6">
                <button class="bg-custom-red hover:bg-red-700 text-white text-3xl px-5 py-2 rounded-2xl">
                  ACEPTAR
                </button>
                <button class="bg-custom-red hover:bg-red-700 text-white text-3xl px-5 py-2 rounded-2xl">
                  CANCELAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  `,
  styles: `
    .demo-inline-calendar-card {
      width: 300px;
    }
  `
})
export class ActivitiesComponent {
  selected: Date = new Date('2021-06-01');
  hours = ['10:00 11:30', '13:30 15:00', '17:30 19:00'];
  activites: Activity[] = [];
  activityTypes: ActivityType[] = [];
  monitors: Monitors[] = [];
  isModalOpen: boolean = true;

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

  removeActivity(activity: Activity) {
    this.activites = this.activites.filter((a) => a !== activity);
  }

  loadMonitor(activity: Activity, hour: string) {
    // console.log(activity);
  }

  openModal(hour: string) {
    // console.log(hour);
  }
}

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  providers: [GlobalApiService],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }