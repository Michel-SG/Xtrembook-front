import { Injectable } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';
import { Lignepanier } from 'src/app/interfaces/lignepanier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  prixTotal = 0;

  article1: Articles = {//TEMPORAIRE---------------------------------
    referenceArticle: 1,
    titre: "Livre 1",
    prixUnit: 10,
  };
  article2: Articles = {
    referenceArticle: 2,
    titre: "Livre 2",
    prixUnit: 10,
  };//TEMPORAIRE-----------------------------------------------------
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

  recuperationLocalStorageTMP() {//TEMPORAIRE
    this.panier = [{article: this.article1, quantite: 1}, {article: this.article2, quantite: 1}];;
    return this.panier;
  }

  ajoutArticle(articleSupp) {
    this.recuperationLocalStorage();
    //Création d'une ligne temporaire
    let lignePanier: Lignepanier = {article: articleSupp, quantite : 1};

    let idArticle = this.panier.find((elt) => elt.article.referenceArticle == lignePanier.article.referenceArticle);
    if (idArticle) {
      idArticle.quantite ++;
    } else {
      this.panier.push({ article: articleSupp, quantite: 1 });
    }
    this.enregistrerPanier();
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
}