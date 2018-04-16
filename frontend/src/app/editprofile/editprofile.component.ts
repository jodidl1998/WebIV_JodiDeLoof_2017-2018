import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

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

  editSubmit(form){
    let newDescription = form.newDescription;
    if(newDescription && newDescription != this.description){
      let user = {
        username: this.username,
        description : newDescription,
        picture: this.picture
      };
      this.dataService.updateUser(user).subscribe(data => {
        if(data){
          this.router.navigate(['/profile']);
        }
      });
    }
  }
}
