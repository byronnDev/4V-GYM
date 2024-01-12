import { Injectable } from '@angular/core';

export interface Activity {
  id: number;
  activityType: ActivityType;
  monitors: Monitors[];
  date_start: Date;
  date_end: Date;
}

export interface ActivityType {
  id: number;
  name: ActivityTypeEnum;
  numberMonitors: number;
}

export enum ActivityTypeEnum {
  BodyPump = "BodyPump",
  Spinning = "Spinning",
  Pilates = "Pilates"
}

export interface Monitors {
  id: number;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalApiService {
  activities: Activity[];
  monitors: Monitors[];
  activityTypes: ActivityType[];

  constructor() {
    this.activityTypes = [
      {
        id: 1,
        name: ActivityTypeEnum.BodyPump,
        numberMonitors: 1
      },
      {
        id: 2,
        name: ActivityTypeEnum.Pilates,
        numberMonitors: 1
      },
      {
        id: 3,
        name: ActivityTypeEnum.Spinning,
        numberMonitors: 2
      },
    ];

    this.monitors = [
      {
        id: 1,
        name: 'Juan',
        email: 'juan@gmail.com',
        phone: '123890567',
      },
      {
        id: 2,
        name: 'Arkaitz',
        email: 'arkaitzcs@gmail.com',
        phone: '666666666',
      },
      {
        id: 3,
        name: 'Ander',
        email: 'andeer.1@gmail.com'
      },
    ];
    this.activities = [
      {
        id: 1,
        activityType: {
          id: 1,
          name: ActivityTypeEnum.BodyPump,
          numberMonitors: 1
        },
        monitors: [
          this.monitors[0]
        ],
        date_start: new Date('2021-06-01T10:00:00'),
        date_end: new Date('2021-06-01T11:30:00')
      },
      {
        id: 2,
        activityType: {
          id: 2,
          name: ActivityTypeEnum.Pilates,
          numberMonitors: 1
        },
        monitors: [
          this.monitors[1]
        ],
        date_start: new Date('2021-06-01T13:30:00'),
        date_end: new Date('2021-06-01T15:00:00')
      },
      {
        id: 3,
        activityType: {
          id: 3,
          name: ActivityTypeEnum.Spinning,
          numberMonitors: 2
        },
        monitors: [
          this.monitors[2], this.monitors[1]
        ],
        date_start: new Date('2021-06-01T17:30:00'),
        date_end: new Date('2021-06-01T19:00:00')
      },
    ];
  }

  getActivities(): Activity[] {
    return this.activities;
  }

  getMonitors(): Monitors[] {
    return this.monitors;
  }

  addActivity(activity: Activity): void {
    this.activities.push(activity);
  }

  addMonitor(monitor: Monitors): void {
    this.monitors.push(monitor);
  }

  removeActivity(activity: Activity): void {
    this.activities = this.activities.filter(a => a.id !== activity.id);
  }

  removeMonitor(monitor: Monitors): void {
    this.monitors = this.monitors.filter(m => m.id !== monitor.id);
  }
}