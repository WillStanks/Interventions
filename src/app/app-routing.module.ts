import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeProblemeComponent } from './liste-probleme/liste-probleme.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  { path:'accueil', component:AccueilComponent},
  { path: 'probleme', component:ProblemeComponent},
  { path: 'liste-probleme', component:ListeProblemeComponent},
  { path: '', redirectTo: 'accueil', pathMatch:'full'},
  { path: '**', redirectTo: 'accueil', pathMatch:'full'} // Si la route est inexistante. Rediriger l'utilisateur sur l'accueil.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
