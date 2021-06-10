import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './composants/menu/menu.component';
import { ArticlesComponent } from './composants/articles/articles.component';
import { ConnexionComponent } from './composants/auth/connexion/connexion.component';
import { InscriptionComponent } from './composants/auth/inscription/inscription.component';
import { CommandeComponent } from './composants/commande/commande.component';
import { PanierComponent } from './composants/panier/panier.component';
import { LivreUniqueComponent } from './composants/livre-unique/livre-unique.component';
import { CommandeValideeComponent } from './composants/commande-validee/commande-validee.component';

const routes: Routes = [
  {path: 'auth/connexion', component: ConnexionComponent},
  {path: 'auth/inscription', component: InscriptionComponent},
  {path: 'article', component: ArticlesComponent},
  {path: 'livre/:referenceArticle', component: LivreUniqueComponent},
  {path: 'article/commande', component: CommandeComponent},
  {path: 'commande-validee', component: CommandeValideeComponent},
  {path: 'article/panier', component: PanierComponent},
  {path: '', pathMatch: 'full', redirectTo: 'article'},
  {path: '**',redirectTo: 'article'}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
