import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { HomeComponent } from '../dashboard/home/home.component';
import { DashboardDataService } from '../dashboard/dashboard-data.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { RegisterComponent } from '../user/register/register.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { LoginComponent } from '../user/login/login.component';
import { LogoutComponent } from '../user/logout/logout.component';
import { FaqComponent } from '../faq/faq.component';


const appRoutes: Routes = [
  {path: 'home', component: LandingpageComponent},
  {path: '', component: LandingpageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'veelgesteldevragen', component: FaqComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  providers: [SelectivePreloadStrategy],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
