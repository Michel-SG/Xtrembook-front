import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Articles } from 'src/app/interfaces/articles';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  quantityInCart: number;
 
  productsInCart: Array<Articles> = [];

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
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
