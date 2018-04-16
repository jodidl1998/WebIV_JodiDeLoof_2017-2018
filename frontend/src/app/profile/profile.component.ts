import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username;
  description;
  picture;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    let loggedInUser = this.dataService.getLoggedInUser();
    console.log(loggedInUser.username);
    this.dataService.getUserDataByUsername(loggedInUser.username).subscribe(data => {
      console.log(data);
      this.username = data.user.username;
      this.description = data.user.description;
      this.picture = data.user.picture;
    });
    
  }

  
}
