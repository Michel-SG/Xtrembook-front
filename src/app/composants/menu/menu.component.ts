import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/articles/article.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  prenom: string;
  searchForm = this.formBuilder.group({
    mots: ['', Validators.required]
  });
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder, 
    private search: ArticleService) { }

  ngOnInit(): void {
    this.prenom = JSON.parse(localStorage.getItem('userName'));
    
  }
  onSubmitSearch(){
    
  }
  onLogout() {
    this.auth.logout();
  }
  

}
