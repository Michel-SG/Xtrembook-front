import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Articles } from 'src/app/interfaces/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = 'http://localhost:3000/article/';
  private urlD = 'http://localhost:3000/livre/';
  private uri = "http://localhost:3000/";
  

  constructor(private http: HttpClient) { }
  getAllArticles() {
    return this.http.get<Array<Articles>>(this.url);
  }
  getOneById(referenceArticle) {
    return this.http.get<Articles>(this.urlD+referenceArticle);
  }
  submitSearch(mot: string){
    // return this.http.post(this.uri+'search',mot)
    return new Promise((resolve, reject) => {

      this.http.post(this.uri + "article/search", {
        parameter: mot
      })
        .subscribe((response) => {
          
          console.log(response)
          resolve(response);
        },
          (error) => {
            reject(error);
          })

    });
  }
}
