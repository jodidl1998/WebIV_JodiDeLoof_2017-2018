import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Classroom } from '../classroom.model';
import { Router } from '@angular/router';
import { delay } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _deadlines;
  private _count;
  private _classroom:Classroom;
  private hasClassroom = false;
  private showMainSpinner = true;
  private showBottomSpinner = false;
  addDeadline: FormGroup;

  constructor(private dataService:DashboardDataService,private fb: FormBuilder, private router:Router) { }
  
  ngOnInit() {
    

    this.dataService.classroom.subscribe(data => {
      this._classroom = data;
      
      this.showMainSpinner = false;
      if(this._classroom != undefined){
        this.hasClassroom = true;
      }
      
      if(this._classroom != undefined){
        this.dataService.getDeadlinesByRoom(this._classroom).subscribe(data => {
          this._deadlines = data;
          this._count = data.length;
        });
      }

    });

    this.showMainSpinner = false;

    this.addDeadline = this.fb.group({
      date:['', [Validators.required, Validators.minLength(2)]],
      vak:['', [Validators.required, Validators.minLength(2)]],
      beschrijving:['', [Validators.required, Validators.minLength(2)]],
      procent:['', [Validators.required, Validators.minLength(2)]]
    });

    this.addDeadline.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(data => {
        console.log(data);
      });
  }

  onDeadlineSubmit(){
    this.showBottomSpinner = true;
    this.dataService.addNewDeadline(this.addDeadline.value, this._classroom).subscribe(data => {
      console.log(data);
      
      this._deadlines.push(data);
      this._count++;
      
      this.showBottomSpinner = false;
      
    });
  }

  get deadlines(){
    return this._deadlines;
  }

  get deadlineCount(){
    return this._count;
  }

  leaveRoom(){
    this.dataService.leaveClassroom();
    this.hasClassroom = false;
  }
}
