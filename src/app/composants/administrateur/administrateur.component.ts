import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {
  articles: Articles[];
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    // this.articles =this.articleService.articleConsultes;
    // console.log(this.articles)
    this.initialize()
  }

  initialize() {
    this.articleService.afficherconsultation().subscribe((response)=>{
      this.articles = response;
      console.log(response)
    });
  }

}
