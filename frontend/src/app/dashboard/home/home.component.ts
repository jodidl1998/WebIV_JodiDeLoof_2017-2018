import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from '../dashboard-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _deadlines;
  private _count;

  addDeadline: FormGroup;

  constructor(private dataService:DashboardDataService,private fb: FormBuilder) { }
  
  ngOnInit() {
    this.dataService.deadlines.subscribe(data => {
      this._deadlines = data;
      this._count = data.length;
    });

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
    this.dataService.addNewDeadline(this.addDeadline.value).subscribe(data => {
      this._deadlines.push(data);
      this._count++;
    });
  }

  get deadlines(){
    return this._deadlines;
  }

  get deadlineCount(){
    return this._count;
  }
}
