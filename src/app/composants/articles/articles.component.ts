import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Articles } from 'src/app/interfaces/articles';
import { ArticleService } from 'src/app/services/articles/article.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  searchForm = this.formBuilder.group({
    parameter: ['', Validators.required]
  });
  article: Articles = {};
  articles: Articles[] = [];
  all: Articles[] = [];
  reponses: Articles[];
  constructor(
    private formBuilder: FormBuilder,
    private articlesService: ArticleService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.articlesService.getAllArticles().subscribe((res) => {
      this.all = res;
      this.articles = this.all.filter((elt) => elt.stock != 0);
      console.log(res);
    });
  }
  onSubmitSearch(){
    console.log(this.searchForm.value);
    this.articlesService.getAllByParameter(this.searchForm.value).subscribe((res) => {
      this.reponses = res;
      console.log(this.reponses);
    })
  }
}
