import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardDataService } from '../dashboard-data.service';
import { Router } from '@angular/router';
import { Classroom } from '../classroom.model';

@Component({
  selector: 'app-join-classroom',
  templateUrl: './join-classroom.component.html',
  styleUrls: ['./join-classroom.component.css']
})
export class JoinClassroomComponent implements OnInit {

  public classroom: FormGroup;
  
  constructor(private dataService: DashboardDataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.classroom = this.fb.group({
      classroomCode: ['', Validators.required]
    });
  }

  onSubmit(){
    
      
      this.dataService.getIdFromCode(this.classroom.value.classroomCode).subscribe(data => {
        let id = data.id;
        this.dataService.joinClassroom(id).subscribe(data => {
          this.router.navigate(['/dashboard']);
        });
      });

      
    
  }

}
