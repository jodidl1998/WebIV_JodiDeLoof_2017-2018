import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class DataService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  getArticles() {
    return this.http.get('http://localhost:3000/articles').map(res => res.json());
  }

  addArticle(newArticle) {
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post('http://localhost:3000/article/', newArticle, {headers: headers}).map(res => res.json());
  }

  register(user){
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).map(res => res.json());
  }

  authUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post('http://localhost:3000/users/auth', user, {headers: headers}).map(res => res.json());
  }

  storeUser(token, user){
    localStorage.setItem('token', token);

    let userobj = {
      username: user.username,
    };

    localStorage.setItem('user',JSON.stringify(userobj));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  eenpagina(){
    let headers = new Headers();
    this.loadToken();
    headers.append("Authorization",this.authToken);
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:3000/users/eenpagina', {headers: headers}).map(res => res.json());
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }

  loggedIn(){
    return tokenNotExpired();
  }
}
