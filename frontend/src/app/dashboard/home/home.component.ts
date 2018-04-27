import { Component, OnInit } from "@angular/core";
import { DashboardDataService } from "../dashboard-data.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Classroom } from "../classroom.model";
import { Router } from "@angular/router";
import { delay } from "q";
import { AuthenticationService } from "../../user/authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  private _deadlines;
  private _count;
  private _classroom: Classroom;


  //booleans voor html showing
  private hasClassroom = false;
  private showMainSpinner = true;
  private showBottomSpinner = false;
  private showClassCodeError = false;

  addDeadline: FormGroup;

  constructor(
    private dataService: DashboardDataService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.dataService.classroom.subscribe(data => {
      this._classroom = data;

      this.showMainSpinner = false;
      if (this._classroom != undefined) {
        this.hasClassroom = true;
      }

      if (this._classroom != undefined) {

        if(this.authService.classCode != undefined){
          this.showClassCodeError = true;
        }

        this.dataService.getDeadlinesByRoom(this._classroom).subscribe(data => {
          this._deadlines = data;
          this._count = data.length;
        });
      } else {
        if (this.authService.classCode != undefined) {
          this.showMainSpinner = true;
          this.dataService.getIdFromCode(this.authService.classCode).subscribe(data => {              
              this.dataService.joinClassroom(data.id).subscribe(data => {
                this.ngOnInit();
              });
            });
        }
      }
    });

    this.addDeadline = this.fb.group({
      date: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$"
          )
        ]
      ],
      vak: ["", [Validators.required, Validators.minLength(2)]],
      beschrijving: ["", [Validators.required, Validators.minLength(2)]],
      procent: ["", [Validators.required, Validators.minLength(2)]]
    });

    this.addDeadline.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(data => {
        console.log(data);
      });
  }

  onDeadlineSubmit() {
    if (this.addDeadline.valid) {
      this.showBottomSpinner = true;
      this.dataService
        .addNewDeadline(this.addDeadline.value, this._classroom)
        .subscribe(data => {
          console.log(data);

          this._deadlines.push(data);
          this._count++;

          this.showBottomSpinner = false;
        });
    }
  }

  get deadlines() {
    return this._deadlines;
  }

  get deadlineCount() {
    return this._count;
  }

  leaveRoom() {
    this.dataService.leaveClassroom();
    this.hasClassroom = false;
  }
}
