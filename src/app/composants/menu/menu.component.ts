import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  prenom: string;
  admin: number;
  authSubscription: Subscription;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
   
    setInterval(()=>{
      this.prenom = JSON.parse(localStorage.getItem('userName'));
    },200)
    
  }

  onLogout() {
    this.auth.logout();
  }
  

}
