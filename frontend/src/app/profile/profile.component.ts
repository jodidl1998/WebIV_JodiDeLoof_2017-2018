import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  description;
  picture;

  constructor(private dataService:DataService, private router:Router) { }

  ngOnInit() {

    if(this.dataService.loggedIn()){
      let loggedInUser = this.dataService.getLoggedInUser();
      console.log(loggedInUser.username);
      this.dataService.getProfile(loggedInUser.username).subscribe(data => {
        console.log(data);
        this.username = data.user.username;
        this.description = data.user.description;
        this.picture = data.user.picture;
      });
    }else{
      this.router.navigate(['/login']);
    }

    
    
  }

  
}
