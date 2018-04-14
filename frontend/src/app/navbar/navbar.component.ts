import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {

  }

  logout(){
    this.dataService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
