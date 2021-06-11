import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';
import { Lignepanier } from 'src/app/interfaces/lignepanier';
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
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    if (this.panierService.verificationLocalStorage()) {
      //Récupération du panier
      this.panier = this.panierService.recuperationLocalStorage();
    }
    //Récupération du prix total pour l'afficher
    this.prixTotal = this.panierService.calculTotal();
  }
  onCommander() {
    this.router.navigate(['article/','commande']);
  }

  passerCommande() {
    console.log(this.panier);
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
}
