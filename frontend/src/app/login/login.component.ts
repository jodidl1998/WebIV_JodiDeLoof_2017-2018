import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
  }

  loginSubmit(loginData){
    let user = {
      username: loginData.username,
      password: loginData.password
    };

    this.dataService.authUser(user).subscribe(data => {
      if(data.success){
        
        this.dataService.storeUser(data.token, user);
        this.router.navigate(['/home']);
      }else{
        console.log(data);
        //error tonen maar ik weet nog ni hoe
      }
    });
  }
}
