import { Injectable } from '@angular/core';
import { Deadline } from '../../deadline.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DashboardDataService } from '../../dashboard-data.service';
import { Classroom } from '../../classroom.model';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

@Injectable()
export class AgendaResolverService implements Resolve<CalendarEvent[]>{

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CalendarEvent<any>[] | Observable<CalendarEvent<any>[]> | Promise<CalendarEvent<any>[]> {
    this.dataService.classroom.subscribe(data => {
      let _classroom = data;


      if (_classroom != undefined) {
        this.dataService.getDeadlinesByRoom(_classroom).subscribe(data => {
          let _deadlines = data;
          let _count = data.length;

          

          for (let deadline of _deadlines) {
            let date = deadline.date;
            let day =Number(date.substr(0,2));
            let month = Number(date.substr(3,2));
            let year = Number(date.substr(6,4));
            
            

            let fullDate = new Date(year,month-1, day);            
            console.log(fullDate);
            
            let events: CalendarEvent[] = [];

            events.push({
              start: fullDate,
              title: deadline.vak+": "+ deadline.beschrijving + " (op " +deadline.procent+ ")"
            });
            return events;
          }
        });        
      }
      
    });
    return null;    
  }
  constructor(private dataService:DashboardDataService) { }


}
