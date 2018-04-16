import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private dataService: DataService, private router:Router) { }


  logout(){
    this.dataService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
