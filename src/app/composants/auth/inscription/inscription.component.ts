import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  loading: boolean;
  errorMsg: string;
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
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmitForm() {
    this.authService.createUser(this.signupForm.value).then(response=>{
      this.authService.loginUser(this.signupForm.value)
      .then(()=>{
        this.loading = false;
        this.router.navigate(['/article']);
      })
    })

  }

}
