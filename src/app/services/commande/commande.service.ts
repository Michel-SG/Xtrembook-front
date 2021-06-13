import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  host = environment.host;

  constructor(private http: HttpClient) { }

  envoyerCommande = (commande: Commande) => {
    return new Promise((resolve, reject) => {
      this.http.post(this.host + "/api/commande", commande)
        .subscribe((response: Commande) => {
          resolve(response);
        },
          (error) => {
            reject(error);
          })
    });
  }
}
