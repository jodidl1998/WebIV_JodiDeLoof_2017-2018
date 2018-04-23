import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Deadline } from './deadline.model';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardDataService {
  
  constructor(private http: HttpClient) {
  }

  get deadlines():Observable<Deadline[]>
  {
    return this.http.get('/API/getDeadlines').pipe(
      map((list: any[]): Deadline[]=>
        list.map(item => 
          new Deadline(item.date,item.vak, item.beschrijving, item.procent)
        )
      )
    );
  }

  get countDeadlines()
  {
    return this.http.get('/API/countDeadlines');
  }

  addNewDeadline(deadline:Deadline){
    return this.http.post('/API/addDeadline', deadline).pipe(map(Deadline.fromJSON));
  }

  removeDeadline(deadline:Deadline){
    return this.http.delete(`/API/removeDeadline/${deadline.id}`).pipe(map(Deadline.fromJSON));
  }
}
