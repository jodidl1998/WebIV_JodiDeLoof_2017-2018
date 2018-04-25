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

const routes = [
  { path: 'dashboard', canActivate: [ AuthGuardService ], component: HomeComponent },
  { path: 'addClassroom', canActivate: [AuthGuardService ], component: AddClassroomComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    AddClassroomComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [httpInterceptorProviders, DashboardDataService]
})
export class DashboardModule {}
