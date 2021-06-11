import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/articles/article.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
 mot: string;
  constructor(private route: ActivatedRoute, private search: ArticleService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(res => {
    //   this.mot = res.get('mot');
    //   });
    // }
  }

}
