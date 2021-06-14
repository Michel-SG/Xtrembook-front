import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { Lignepanier } from 'src/app/interfaces/lignepanier';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommandeService } from 'src/app/services/commande/commande.service';
import { PanierService } from 'src/app/services/panier/panier.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  numcommande = "";
  commande: Commande = {
    user: {},
    products: [{
      id: 0,
      quantite: 0
    }]
  };
  panier: Array<Lignepanier> = [];
  client: User = {};

  signupForm = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    adresse: this.formBuilder.group({
      numero: [null, Validators.required],
      typeDeVoie: ['', Validators.required],
      nomDeVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required]
    })
  });
  date = new Date;
  jour = "";
  mois = "";
  annee = "";

  constructor(
    private formBuilder: FormBuilder,
    private panierService: PanierService,
    private commandeService : CommandeService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  trouverDate(){
    //Récupération de la date actuelle
    this.annee = this.date.getFullYear().toString();
    this.mois = (this.date.getMonth()+1).toString();
    this.jour = this.date.getDate().toString();
    //On rajoute les 0 s'il en manque
    if (this.mois.length < 2){
      this.mois = "0" + this.mois;
    }
    if (this.jour.length < 2){
      this.jour = "0" + this.jour;
    }
    return this.annee + "-" + this.mois + "-" + this.jour;
  }
  
  validationCommande(){
    this.creationCommande();
    this.commandeService.envoyerCommande(this.commande).then(
      (res) => {
        this.router.navigate(["commande-validee/"+res[1]]);
        this.panierService.viderStockageLocal();
        console.log(res[1]);
      });
  }

  creationCommande(){
    //Récupération du panier
    this.panier = this.panierService.recuperationLocalStorage();
    //Récupération du client
    this.client = {
      id: this.authService.getUserId(),
      nom: this.signupForm.value.nom,
      prenom: this.signupForm.value.prenom,
      email: this.signupForm.value.email,
      date: this.trouverDate(),
      adresse: {
        numero: this.signupForm.value.adresse.numero,
        typeDeVoie: this.signupForm.value.adresse.typeDeVoie,
        nomDeVoie: this.signupForm.value.adresse.nomDeVoie,
        codePostal: this.signupForm.value.adresse.codePostal,
        ville: this.signupForm.value.adresse.ville,
        pays: this.signupForm.value.adresse.pays
      }
    };
    //On stocke le client dans la commande
    this.commande.user = this.client;

    //On stocke les articles dans la commande
    for (let i = 0; i < this.panier.length - 1; i++) {
      this.commande.products[i] = {
        id: this.panier[i].article.referenceArticle,
        quantite: this.panier[i].quantite
      };
    }
  }
}
