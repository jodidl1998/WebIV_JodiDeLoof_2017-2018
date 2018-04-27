import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { httpInterceptorProviders } from '../http-interceptors/index';
import { HomeComponent } from './home/home.component';
import { DashboardDataService } from './dashboard-data.service';
import { AuthGuardService } from '../user/auth-guard.service';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { JoinClassroomComponent } from './join-classroom/join-classroom.component';
import { LoadingspinnerComponent } from './loadingspinner/loadingspinner.component';
import { DeadlineComponent } from './deadline/deadline.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule } from 'angular-calendar';


const routes = [
  { path: 'dashboard', canActivate: [ AuthGuardService ], component: HomeComponent },
  { path: 'addClassroom', canActivate: [AuthGuardService ], component: AddClassroomComponent },
  { path: 'joinClassroom', canActivate: [AuthGuardService ], component: JoinClassroomComponent },
  { path: 'calendar', canActivate:[AuthGuardService], component: CalendarComponent}
];

@NgModule({
  declarations: [
    HomeComponent,
    AddClassroomComponent,
    JoinClassroomComponent,
    LoadingspinnerComponent,
    DeadlineComponent,
    CalendarComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(routes)
    
  ],
  providers: [httpInterceptorProviders, DashboardDataService]
})
export class DashboardModule {}
