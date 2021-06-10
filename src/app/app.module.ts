import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './composants/menu/menu.component';
import { ArticlesComponent } from './composants/articles/articles.component';
import { ConnexionComponent } from './composants/auth/connexion/connexion.component';
import { InscriptionComponent } from './composants/auth/inscription/inscription.component';
import { CommandeComponent } from './composants/commande/commande.component';
import { PanierComponent } from './composants/panier/panier.component';
import { LivreUniqueComponent } from './composants/livre-unique/livre-unique.component';
import { CommandeValideeComponent } from './composants/commande-validee/commande-validee.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ArticlesComponent,
    ConnexionComponent,
    InscriptionComponent,
    CommandeComponent,
    PanierComponent,
    LivreUniqueComponent,
    CommandeValideeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
