import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ElementRef
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
import { Subject } from "rxjs/Subject";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK
} from "angular-calendar";
import { DashboardDataService } from "../dashboard-data.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Classroom } from "../classroom.model";
import { Deadline } from "../deadline.model";
import { Observable } from "rxjs/Observable";
import { CustomDateFormatter } from "./custom-date-formatter.provider";
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from "@angular/common";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3"
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF"
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA"
  },
  green: {
    primary: "#7de363",
    secondary: "#FDF1BA"
  }
};

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./calendar.component.css"],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class CalendarComponent implements OnInit {
  private _classroom: Classroom;
  private _deadlines: Deadline[];
  private _count;
  private hasClassroom = false;
  view: string = "month";
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;
  pullingData = true;

  locale: string = 'nl';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  
  @ViewChild('next') next:ElementRef;
  @ViewChild('today') today:ElementRef;

  constructor(
    private dataService: DashboardDataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    registerLocaleData(localeNl);
    

    if (this._deadlines == undefined) {
      this.pullingData = true;
      this.dataService.classroom.subscribe(data => {
        this._classroom = data;

        if (this._classroom != undefined) {
          this.hasClassroom = true;
        }

        if (this._classroom != undefined) {
          this.dataService
            .getDeadlinesByRoom(this._classroom)
            .subscribe(data => {
              this._deadlines = data;
            });
        }
        console.log(this.pullingData + " in if als == undifened");
        this.ngOnInit();
      });
    } else {
      this._count = this._deadlines.length;

      for (let deadline of this._deadlines) {
        let date = deadline.date;
        let day = Number(date.substr(0, 2));
        let month = Number(date.substr(3, 2));
        let year = Number(date.substr(6, 4));

        let fullDate = new Date(year, month - 1, day);

        this.events.push({
          start: fullDate,
          title:
            deadline.vak +
            ": " +
            deadline.beschrijving +
            " (op " +
            deadline.procent +
            ")"
        });
      }

      if(this.pullingData == true){
        this.next.nativeElement.click();
        this.today.nativeElement.click();
      }
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}
