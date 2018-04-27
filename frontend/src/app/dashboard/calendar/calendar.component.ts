import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { DashboardDataService } from '../dashboard-data.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Classroom } from '../classroom.model';
import { Deadline } from '../deadline.model';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#7de363',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private _classroom: Classroom;
  private _deadlines: Deadline[];
  private _count;
  private hasClassroom = false;
  view: string = 'month';
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  pullingData = true;

  constructor(
    private dataService: DashboardDataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.events.push({
      start: new Date(),
      title: "Geen deadlines gevonden tegen vandaag",
      color: colors.green
    });
    
    this.dataService.classroom.subscribe(data => {
      this._classroom = data;

      if (this._classroom != undefined) {
        this.hasClassroom = true;
      }

      if (this._classroom != undefined) {
        this.dataService.getDeadlinesByRoom(this._classroom).subscribe(data => {
          this._deadlines = data;
          this._count = data.length;

          

          for (let deadline of this._deadlines) {
            let date = deadline.date;
            let day =Number(date.substr(0,2));
            let month = Number(date.substr(3,2));
            let year = Number(date.substr(6,4));
            
            

            let fullDate = new Date(year,month-1, day);            
            console.log(fullDate);
            
            this.events.push({
              start: fullDate,
              title: deadline.vak+": "+ deadline.beschrijving + " (op " +deadline.procent+ ")"
            });
          }

          this.pullingData = false;
        });

        
      }
    });

    
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
