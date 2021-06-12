import { Injectable } from '@angular/core';
import { Lignepanier } from 'src/app/interfaces/lignepanier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  prixTotal = 0;
  panier: Array<Lignepanier> = [];

  constructor() { }

  verificationLocalStorage() {
    if (localStorage.length != 0) {
      //Lecture du localstorage et récupération du panier
      for (let i = 0; i < localStorage.length; i++) {
        let clef = localStorage.key(i);
        let article = JSON.parse(localStorage.getItem(clef));
        //Stockage des articles dans le panier
        this.panier.push({ article: article.article, quantite: article.quantite });
      }
      return true;
    }
    return false;
  }

  recuperationLocalStorage() {
    this.panier = JSON.parse(localStorage.getItem("panier"));
    return this.panier;
  }

  ajoutArticle(articleSupp) {
    if (this.verificationLocalStorage()){//Si le localstorage contient le ligne panier,
      this.recuperationLocalStorage();//On récupère le contenu de cette ligne
    }
    //Création d'une ligne temporaire
    let lignePanier: Lignepanier = { article: articleSupp, quantite: 1 };

    if (this.panier != null) {//Si le panier n'est pas vide
      let idArticle = this.panier.find((elt) => elt.article.referenceArticle == lignePanier.article.referenceArticle);
      if (idArticle) {//Si l'article existe déjà dans le panier
        idArticle.quantite++;
      }
      else {//Ajout de l'article à la fin du panier
        this.panier.push({ article: articleSupp, quantite: 1 });
      }
    }
    else {//Ajout de l'article au début du panier
      this.panier[0] = { article: articleSupp, quantite: 1 };
    }
    this.enregistrerPanier();//Enregistrement du panier dans le stockage local
  }

  enregistrerPanier() {
    localStorage.setItem("panier", JSON.stringify(this.panier));
  }

  modifierQuantite(idArticle, op) {
    if (op == "-" && this.panier[idArticle].quantite == 1) {
      //Si la quantité de l'article va être à 0 donc on fait rien (pour l'instant)
      console.log("l'article est à sa quantité minimum");
      return false;
    }
    this.panier[idArticle].quantite = eval(this.panier[idArticle].quantite + op + 1);
    this.enregistrerPanier();
    return true;
  }

  supprimerArticle(idArticle) {
    this.prixTotal -= this.panier[idArticle].quantite * this.panier[idArticle].article.prixUnit;
    //Suppression de l'article dans le panier
    this.panier.splice(idArticle, 1);
    this.enregistrerPanier();
  }

  calculTotal() {
    //Calcul du prix total du panier en tenant compte des quantités
    this.prixTotal = 0;
    this.panier.forEach(article => {
      this.prixTotal += article.quantite * article.article.prixUnit;
    });
    return this.prixTotal;
  }

  viderStockageLocal() {
    //A faire quand la commande est validéee
  }
}