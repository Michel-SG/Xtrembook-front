import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from 'src/app/interfaces/commande';
import { CommandeValidee } from 'src/app/interfaces/commandeValidee';

@Injectable({
  providedIn: 'root'
})
export class CommandeValideeService {
  private url = 'http://localhost:3000/commande-validee/';
  constructor(private http: HttpClient) { }
  getCommande(numCommande) {
    return this.http.get<CommandeValidee>(this.url + numCommande);
  }
}
