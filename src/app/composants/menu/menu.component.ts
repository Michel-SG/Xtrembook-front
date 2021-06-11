import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  prenom: string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.prenom = JSON.parse(localStorage.getItem('userName'));
    
  }
  onLogout() {
    this.auth.logout();
  }
  

}
