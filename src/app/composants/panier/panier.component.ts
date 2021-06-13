import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from 'src/app/interfaces/articles';
import { Lignepanier } from 'src/app/interfaces/lignepanier';
import { ArticleService } from 'src/app/services/articles/article.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  prixTotal = 0; //Prix total du panier
  panier: Array<Lignepanier> = []; //Le panier

  constructor(
    private panierService: PanierService,
    private articlesService: ArticleService,
    private router: Router
  ) { }

  ngOnInit(): void {    
    if (this.panierService.verificationLocalStorage()) {
      //Récupération du panier
      this.panier = this.panierService.recuperationLocalStorage();
    }
    if (this.panier != null){
      //Récupération du prix total pour l'afficher
    this.prixTotal = this.panierService.calculTotal();
    }
    
  }

  modifierQuantite(idArticle, op) {
    if (this.panierService.modifierQuantite(idArticle, op)) {
      this.prixTotal = this.panierService.calculTotal();
    }
  }

  supprimerArticle(idArticle) {
    this.panierService.supprimerArticle(idArticle);
    this.prixTotal = this.panierService.calculTotal();
  }

  passerCommande() {
    //On vérifie les stocks disponibles
    this.verifStock();
  }

  verifStock() {
    //Mise à jour des informations de chaque article depuis la base de données
    this.panier.forEach(article => {
      this.articlesService.getOneById(article.article.referenceArticle).subscribe((res) => {
        article.article = res;
      });
    })

    let stocksDispo = true;
    //Vérification des disponibilités
    this.panier.forEach(article => {
      if (article.quantite > article.article.stock){
        stocksDispo = false;
      }
    })
    if(stocksDispo && this.panier.length > 0){
        this.router.navigateByUrl("commande");
      }
  }    
}
