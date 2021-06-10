import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.host;
  isAuth$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  createUser = (user: User) => {
    return new Promise((resolve, reject) => {

      this.http.post(this.host + "/api/user/signup", user)
        .subscribe((response) => {
          console.log("dans service "+response)
          resolve(response);
        },
          (error) => {
            reject(error);
          })

    });
  }
}
