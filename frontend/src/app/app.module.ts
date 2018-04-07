import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';
import { EyecatcherComponent } from './eyecatcher/eyecatcher.component';
import { TrendingComponent } from './trending/trending.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    HomeComponent,
    EyecatcherComponent,
    TrendingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
