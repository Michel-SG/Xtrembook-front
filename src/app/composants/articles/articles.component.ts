import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';
import { ArticleService } from 'src/app/services/articles/article.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  article: Articles = {
  };
  recherche: Articles;
  articles: Articles[] = [];
  constructor(private articlesService: ArticleService, 
    private panierService: PanierService) {}

  ngOnInit(): void {
    this.initialize();
    
    
  }

  initialize() {
    this.articlesService.getAllArticles().subscribe((res) => {
      this.articles = res;
      console.log(res);
    });
  }

  ajouterAuPanier(article){
    this.panierService.ajoutArticle(article);
  }
}
