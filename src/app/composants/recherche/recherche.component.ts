import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articles } from 'src/app/interfaces/articles';
import { ArticleService } from 'src/app/services/articles/article.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  mots: string
  article: Articles = {};
  articles: Articles[] = [];
  constructor(private articlesService: ArticleService, 
    private panierService: PanierService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.route.paramMap.subscribe(
      (value) => {
        this.mots = value.get('mots') ?? '';
        console.log(this.mots)
        // this.articlesService.getOneById(this.referenceArticle).subscribe((res) => {
        //   this.livre = res;
        //   console.log(this.livre);
        //   console.log(this.livre.auteurs);
        // });
      });
      // this.route.paramMap.subscribe(
      //   (value) => {
      //     this.referenceArticle = value.get('referenceArticle') ?? '';
      //     console.log(this.referenceArticle)
      //     this.articlesService.getOneById(this.referenceArticle).subscribe((res) => {
      //       this.livre = res;
      //       console.log(this.livre);
      //       console.log(this.livre.auteurs);
      //     });
      //   });
    }
}
