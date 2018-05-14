import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutingModule } from './routing/routing.module';
import { AuthenticationService } from './user/authentication.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthGuardService } from './user/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    NotFoundComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    RoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
