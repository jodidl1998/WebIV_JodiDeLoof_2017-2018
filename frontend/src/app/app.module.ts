import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HomeComponent } from './dashboard/home/home.component';
import { DashboardDataService } from './dashboard/dashboard-data.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutingModule } from './routing/routing.module';
import { RegisterComponent } from './user/register/register.component';
import { AuthenticationService } from './user/authentication.service';
import { LoginComponent } from './user/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [DashboardDataService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
