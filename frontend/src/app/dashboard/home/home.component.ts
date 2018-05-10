import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
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
  editDeadline: FormGroup;

  //viewchilds
  @ViewChild("btnClose") btnClose: ElementRef;
  @ViewChild("modal") modal: ElementRef;

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
        if (this.authService.classCode != undefined) {
          this.showClassCodeError = true;
        }

        this.dataService.getDeadlinesByRoom(this._classroom).subscribe(data => {
          this._deadlines = data;
          this._count = data.length;
        });
      } else {
        if (this.authService.classCode != undefined) {
          this.showMainSpinner = true;
          this.showClassCodeError = false;
          this.dataService
            .getIdFromCode(this.authService.classCode)
            .subscribe(data => {
              this.dataService.joinClassroom(data.id).subscribe(data => {
                this.authService.classCode = undefined;
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

    this.editDeadline = this.fb.group({
      date: [
        "",
        [
          Validators.pattern(
            "^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$"
          )
        ]
      ],
      vak: ["", [Validators.minLength(2)]],
      beschrijving: ["", [Validators.minLength(2)]],
      procent: ["", [Validators.minLength(2)]]
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

  submitEditDeadline(toEditId) {
    //vind oude deadline by id
    let oudeDeadline;

    this._deadlines.forEach(deadline => {
      if (deadline.id === toEditId) {
        oudeDeadline = deadline;
      }
    });

    this.showMainSpinner = true;

    //vervang lege (dus niet veranderde) velden door oude velden
    let editedDeadline = this.editDeadline.value;
    editedDeadline.id = toEditId;

    if (editedDeadline.vak == "") {
      editedDeadline.vak = oudeDeadline.vak;
    }

    if (editedDeadline.date == "") {
      editedDeadline.date = oudeDeadline.date;
    }

    if (editedDeadline.beschrijving == "") {
      editedDeadline.beschrijving = oudeDeadline.beschrijving;
    }

    if (editedDeadline.procent == "") {
      editedDeadline.procent = oudeDeadline.procent;
    }

    //geef de editedDeadline door aan de dataservice
    this.dataService.editDeadline(editedDeadline).subscribe(data => {
      for (var i = 0; i < this._deadlines.length; i++) {
        if (this._deadlines[i].id === toEditId) {
          this._deadlines.splice(i, 1);
          this._deadlines.splice(i, 0, editedDeadline);
        }
      }
      
      this.btnClose.nativeElement.click();
      this.showMainSpinner = false;
      this.router.navigate(["dashboard"]);
    });
  }

  removeDeadline(id: string) {
    console.log(id);

    this.dataService.removeDeadline(id).subscribe(data => {
      console.log(data);

      for (var i = 0; i < this._deadlines.length; i++) {
        if (this._deadlines[i].id === id) {
          this._deadlines.splice(i, 1);
        }
      }
    });
  }

  hideJoinError() {
    this.showClassCodeError = false;
    this.authService.classCode = undefined;
  }
}
