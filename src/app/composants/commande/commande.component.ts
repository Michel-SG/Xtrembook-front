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
  constructor(
    private formBuilder: FormBuilder,
    private panierService: PanierService,
    private commandeService : CommandeService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }
  
  validationCommande(){
    this.creationCommande();
    this.commandeService.envoyerCommande(this.commande).then(
      (res) => {
        this.router.navigate(["commande-validee"]);
        this.panierService.viderStockageLocal();
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
      date: "2021-06-13",
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
