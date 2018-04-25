import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  FormControl
} from '@angular/forms';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DashboardDataService } from '../dashboard-data.service';
import { Classroom } from '../classroom.model';
@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.css']
})
export class AddClassroomComponent implements OnInit {

  public classroom: FormGroup;
  
  constructor(private dataService: DashboardDataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.classroom = this.fb.group({
      classroomName: ['', Validators.required]
    });
  }

  onSubmit(){
    let classroom = new Classroom(this.classroom.value.classroomName);
    classroom.makeCode();
    this.dataService.addNewClassroom(classroom).subscribe(data => {
      classroom = data;
      this.dataService.joinClassroom(classroom).subscribe(data => {
        console.log(data);
      });

      this.router.navigate(['/dashboard']);
    });
    
  }

  

}
