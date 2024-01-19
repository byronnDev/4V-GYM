import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GlobalApiService, Activity, ActivityType, Monitors } from '../global-api.service';
import { FormsModule } from '@angular/forms';

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
                      <button class="absolute bottom-0 right-0 mb-2 mr-2 text-xl text-bold text-amber-700">
                        <img src="../../assets/ic_round-edit.png" alt="edit">
                      </button>
                    } @else {
                      <div class="flex justify-center items-center h-full text-white font-bold">
                        FREE
                        <button class="absolute top-0 right-0 mt-2 mr-2 text-xl text-bold text-amber-700"
                          (click)="openModal(hours[$index])">
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
                        (click)="openModal(hours[$index])">
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
              <!-- Activity type -->
              <select class="input h-12 w-full bg-neutral-400 rounded-2xl text-black text-3xl pl-4 mb-10" [(ngModel)]="activityTypeSelected">
                <option disabled selected>Tipo Actividad</option>
                @for (type of activityTypes; track $index) {
                  <option>{{type.name}}</option>
                }
              </select>
              
              <!-- Monitors -->
              @for (i of numberMonitors; track $index) {
                <select class="input h-12 w-full bg-neutral-400 rounded-2xl text-black text-3xl pl-4" [(ngModel)]="selectedMonitorsName[$index]">
                  <option disabled selected>Select a monitor</option>
                  @for (monitor of monitors; track $index) {
                    <option>{{monitor.name}}</option>
                  }
                </select>
              }
              <!-- Accept and cancel buttons -->
              <div class="flex justify-between space-x-6">
                <button (click)="addActivity()" class="bg-custom-red hover:bg-red-700 text-white text-3xl px-5 py-2 rounded-2xl">
                  ACEPTAR
                </button>
                <button (click)="closeModal()" class="bg-custom-red hover:bg-red-700 text-white text-3xl px-5 py-2 rounded-2xl">
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
export class ActivitiesComponent implements OnInit {
  selected: Date = new Date('2021-06-01');
  hours = ['10:00 11:30', '13:30 15:00', '17:30 19:00'];
  activites: Activity[] = [];
  activityTypes: ActivityType[] = [];
  monitors: Monitors[] = [];
  isModalOpen: boolean = false;
  // Modal variables
  activityTypeSelected: ActivityType;
  selectedMonitorsName: string[];
  selectedMonitors: Monitors[];
  numberMonitors: number[]; // Array of numbers from 0 to activityTypeSelected.numberMonitors

  newActivity: Activity;
  newActivityHour: string;

  constructor(private globalApi: GlobalApiService) {
    this.activites = this.globalApi.activities;
    this.activityTypes = this.globalApi.activityTypes;
    this.monitors = this.globalApi.monitors;

    // Modal variables
    this.activityTypeSelected = this.activityTypes[0];
    this.selectedMonitorsName = [];
    this.numberMonitors = [1, 2];
    this.selectedMonitors = [];

    // Set the new activity
    this.newActivity = {
      id: -1,
      date_start: this.selected,
      date_end: this.selected,
      monitors: [],
      activityType: this.activityTypeSelected
    };
    this.newActivityHour = '';
  }

  ngOnInit() {
    // Set the first activity type as the default value
    if (this.activityTypes && this.activityTypes.length > 0) {
      this.activityTypeSelected = this.activityTypes[0];
    }
  }

  sumarDia() {
    this.selected.setDate(this.selected.getDate() + 1);
  }
  restarDia() {
    this.selected.setDate(this.selected.getDate() - 1);
  }

  removeActivity(activity: Activity) {
    // Remove the activity from the global api
    this.globalApi.removeActivity(activity);
    // Update the activities array
    this.activites = this.globalApi.activities;
  }

  openModal(hours: string) {
    this.isModalOpen = true;
    this.newActivityHour = hours;
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalVariablesDefault();
  }

  modalVariablesDefault() {
    this.activityTypeSelected = this.activityTypes[0];
    this.selectedMonitorsName = [];
    this.numberMonitors = [1, 2];
  }

  changeMonitorNumber() {
    this.numberMonitors = [1, 2];
  }

  addMonitor(monitor: Monitors) {
    this.selectedMonitors.push(monitor);
    return monitor;
  }

  addActivity() {
    // Set the start and end hours
    const startHour = this.newActivityHour.split(' ')[0];
    this.newActivity.date_start.setHours(parseInt(startHour.split(':')[0]));
    this.newActivity.date_start.setMinutes(parseInt(startHour.split(':')[1]));

    // Verificar que los datos sean válidos antes de asignarlos
    if (startHour) {
      // Find the activity with the corresponding start and end hour
      const activityToUpdate = this.activites.find((activity) => {
        const activityStartHour = activity.date_start.getHours();
        return activityStartHour === parseInt(startHour);
      });

      if (activityToUpdate) {
        // Set id to the new activity
        this.newActivity.id = activityToUpdate.id;

        // Selected monitors
        this.selectedMonitors = [];
        for (const monitorName of this.selectedMonitorsName) {
          const monitor = this.globalApi.findMonitor(monitorName);
          if (monitor) {
            this.selectedMonitors.push(monitor);
          }
        }

        // Set monitors to the new activity
        this.newActivity.monitors = this.selectedMonitors;

        // Replace the activity with the new activity in the activities array
        this.globalApi.replaceActivity(this.newActivity);

        // Update the activities array
        this.activites = this.globalApi.activities;

        // Close the modal
        this.closeModal();
      } else {
        // Handle error or display a message indicating that no activity was found
        console.error('No activity found for the specified start and end hour');
      }
    } else {
      // Handle error or display a message indicating invalid data
      console.error('Invalid start or end hour');
    }
  }
}

@NgModule({
  declarations: [ActivitiesComponent],
  imports: [CommonModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  providers: [GlobalApiService],
  exports: [ActivitiesComponent]
})
export class ActivitiesModule { }