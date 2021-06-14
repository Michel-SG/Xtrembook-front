import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livre } from 'src/app/interfaces/livre';
import { ArticleService } from 'src/app/services/articles/article.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-livre-unique',
  templateUrl: './livre-unique.component.html',
  styleUrls: ['./livre-unique.component.css']
})
export class LivreUniqueComponent implements OnInit {
referenceArticle = "";
livre: Livre = {};

  constructor(private articlesService: ArticleService,
    private route: ActivatedRoute,
    private panierService: PanierService) { }

  ngOnInit(): void {
    this.initialize();
  }
initialize() {
  this.route.paramMap.subscribe(
    (value) => {
      this.referenceArticle = value.get('referenceArticle') ?? '';
      this.articlesService.getOneById(this.referenceArticle).subscribe((res) => {
        this.livre = res;
      });
    });
  }

  ajouterAuPanier(article){
    this.panierService.ajoutArticle(article);
  }
}
