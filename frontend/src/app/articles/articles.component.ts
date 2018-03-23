import { Component, OnInit  } from '@angular/core';
import {DataService } from '../data.service';
import {Article} from '../../article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [DataService]
})

export class ArticlesComponent implements OnInit {

  articleList: Article[] = []

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.dataService.getArticles().subscribe(articles => {
      this.articleList = articles;
    });
  }

  addArticle(form) {
    const article: Article = {
      articleUrl: form.value.articleUrl,
      articleTitle: form.value.articleTitle,
      articleDescription: form.value.articleDescription,
      articleThumbnail: form.value.articleThumbnail
    };
    this.dataService.addArticle(article).subscribe(result => {
      console.log(result);
      this.getArticles();
    });
  }
}
