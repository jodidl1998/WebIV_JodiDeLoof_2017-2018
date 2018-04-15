import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form;  

  constructor(private dataService: DataService, private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username : new FormControl("", Validators.required),
      email : new FormControl("",Validators.compose([
        Validators.required, 
        Validators.email
      ])),
      password : new FormControl("",Validators.required),
      repeatPassword: new FormControl("",Validators.required)
    });
    
  }

  registerSubmit(user){
    console.log("aan het registreren");
    this.dataService.register(user).subscribe(data => {
      if(data.success){
        console.log("registered");
        this.router.navigate(['/login']);
      }else{
        console.log(data.message);
      }
    });
  }

}
