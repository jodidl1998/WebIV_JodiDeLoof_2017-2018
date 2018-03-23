import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getArticles() {
    return this.http.get('http://localhost:3000/articles').map(res => res.json());
  }

  addArticle(newArticle) {
    const headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.post('http://localhost:3000/article/', newArticle, {headers: headers}).map(res => res.json());
  }
}
