import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loading: boolean;
  errorMsg: string;
  signinForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', Validators.required],
  });
  constructor(private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }
    onSubmitForm(){
    this.auth.loginUser(this.signinForm.value)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/article']);
      },
        (error) => {
          this.loading = false;
          console.error(error);
          this.errorMsg = "Désolé, votre mot de passe ou email n'est pas correct";
        })
  }

}
