import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Deadline } from './deadline.model';
import { map } from 'rxjs/operators';
import { Classroom } from './classroom.model';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class DashboardDataService {

  private _classroom:Classroom;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
  }

  get countDeadlines()
  {
    return this.http.get('/API/countDeadlines');
  }

  get classroom()
  {
    return this.http.get(`/API/getClassroom/${this.authService.user$.value}`).pipe(map(Classroom.fromJSON));
  }

  getDeadlinesByRoom(classroom:Classroom):Observable<Deadline[]>
  {
    return this.http.get(`/API/getDeadlines/${classroom.id}`).pipe(
      map((list: any[]): Deadline[]=>
        list.map(item => 
          new Deadline(item.date,item.vak, item.beschrijving, item.procent)
        )
      )
    );
  }

  
  addNewDeadline(deadline:Deadline, classroom:Classroom){
    deadline.classroom = classroom.id;
    return this.http.post('/API/addDeadline', deadline).pipe(map(Deadline.fromJSON));
  }

  removeDeadline(deadline:Deadline){
    return this.http.delete(`/API/removeDeadline/${deadline.id}`).pipe(map(Deadline.fromJSON));
  }

  addNewClassroom(classroom:Classroom){
    return this.http.post('/API/addClassroom', classroom).pipe(map(Classroom.fromJSON));
  }

  joinClassroom(_classroom:Classroom){
    let _user = {
      username: this.authService.user$.value,
      classroomId: _classroom.id
    };
    console.log(_user);
    
    return this.http.post('/API/joinClassroom',_user);
  }

  leaveClassroom(){
    let userdata = {
      username: this.authService.user$.value
    }
    return this.http.post('/API/leaveClassroom',userdata).subscribe(data => {
      console.log(data);
      
    });
  }


  
}
