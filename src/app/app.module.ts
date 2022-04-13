import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProblemeService } from './probleme/probleme.service';
import { ListeProblemeComponent } from './liste-probleme/liste-probleme.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent,
    ListeProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProblemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
