import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  signupForm = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', Validators.required],
    adresse: this.formBuilder.group({
      numero: [null, Validators.required],
      typeDeVoie: ['', Validators.required],
      nomDeVoie: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required]
    })
  });

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    this.authService.createUser(this.signupForm.value)
      .then((response) => {
        console.log(response);
      })
      .catch((error)=>{
        console.error(error)
      })

  }

}
