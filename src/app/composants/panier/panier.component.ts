import { Component, OnInit } from '@angular/core';
import { Panier } from 'src/app/interfaces/panier';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
//   panier: [article: {
//     nom, prix, quantite
// }];
panier = [];
article1 = {};
article2 = {};
prixtotal = 0;

  constructor() { }

  ngOnInit(): void {
    this.article1 = { id: 1, nom: "article 1", quantite:1, prix: 12};
    this.article2 = { id: 2, nom: "article 2", quantite:2, prix: 10};

    this.panier = [
      this.article1, this.article2
    ];
    this.calculerPrixTotal();

    this.enregistrerPanier();

  }
  calculerPrixTotal() {
    this.prixtotal = 0;
    this.panier.forEach(article => {
      this.prixtotal += article.prix * article.quantite;
    })
  }

  enregistrerPanier() {
    localStorage.clear();
    this.panier.forEach(article => {
      localStorage.setItem(JSON.stringify(article.id), JSON.stringify(article));
    });
  }

  passerCommande() {

  }

}
