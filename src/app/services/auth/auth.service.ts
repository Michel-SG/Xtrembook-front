import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  constructor() { }

  createUser = (user:User) => {
    return new Promise((resolve, reject) => {
      // let host = environment.host;
      

    })
  }
}
