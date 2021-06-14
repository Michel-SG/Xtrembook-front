import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commande } from 'src/app/interfaces/commande';
import { CommandeValidee } from 'src/app/interfaces/commandeValidee';
import { CommandeValideeService } from 'src/app/services/commande-validee/commande-validee.service';

@Component({
  selector: 'app-commande-validee',
  templateUrl: './commande-validee.component.html',
  styleUrls: ['./commande-validee.component.css']
})
export class CommandeValideeComponent implements OnInit {
numCommande = "";
prixTotal = 0;
commandeValidee : CommandeValidee = {
  user: {},
  adresse: {},
  articles: []
}
  constructor(private route: ActivatedRoute, private commandeValideeService: CommandeValideeService) { 
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.route.paramMap.subscribe(
      (value) => {
        this.numCommande = value.get('numCommande') ?? '';
       // console.log(this.numCommande)
        this.commandeValideeService.getCommande(this.numCommande).subscribe((res) => {
          // console.log(res[0]);
          this.commandeValidee.numCommande = res[0].numCommande;
          this.commandeValidee.dateCommande = res[0].dateCommande;
          this.commandeValidee.user.nom = res[0].nom.replace(/\s+/g, '-');
          this.commandeValidee.user.prenom = res[0].prenom;
          this.commandeValidee.adresse.numero = res[0].num;
          this.commandeValidee.adresse.typeDeVoie = res[0].typeVoie;
          this.commandeValidee.adresse.nomDeVoie = res[0].nomVoie;
          this.commandeValidee.adresse.codePostal = res[0].codePostal;
          this.commandeValidee.adresse.ville = res[0].ville;
          this.commandeValidee.adresse.pays = res[0].pays;
         // console.log(this.commandeValidee);
          console.log(res);
          console.log(Object.keys(res).length);
          for ( let i =0; i < Object.keys(res).length ; i++) {
            this.commandeValidee.articles[i] = {
              titre: res[i].titre,
              quantite: res[i].quantiteCommandee,
              prixUnit: res[i].prixUnit,
            }
            this.prixTotal = this.prixTotal + res[i].quantiteCommandee*res[i].prixUnit;
          }
           console.log(this.commandeValidee);
        });
      });
    }
  
}
