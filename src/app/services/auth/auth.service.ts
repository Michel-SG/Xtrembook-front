import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = environment.host;
  private userId: number;
  private prenom: string;
  isAuth$ = new BehaviorSubject<boolean>(false);
  isAuth= true;
  constructor(private http: HttpClient, private router: Router) { }

  createUser = (user: User) => {
    return new Promise((resolve, reject) => {

      this.http.post(this.host + "/api/user/signup", user)
        .subscribe((response: User) => {
          console.log("prenom "+response.prenom)
          resolve(response);
        },
          (error) => {
            reject(error);
          })

    });
  }
  loginUser(user: User) {
    return new Promise((resolve, reject)=>{
      this.http.post(this.host + "/api/user/login", user).subscribe((response: User)=>{
        this.userId = response.id;
        this.prenom = response.prenom;
        this.isAuth$.next(true);
        resolve(response)
      },
      (error)=>{
        reject(error);
      })
    })
  }
  getUserId(){
    return this.userId;
  }
  getPrenom(){
    return this.prenom;
  }
  logout() {
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(["/article"]);
  }
}
