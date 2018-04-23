import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { httpInterceptorProviders } from '../http-interceptors/index';
import { HomeComponent } from './home/home.component';
import { DashboardDataService } from './dashboard-data.service';
import { AuthGuardService } from '../user/auth-guard.service';

const routes = [
  { path: 'dashboard', canActivate: [ AuthGuardService ], component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent
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
