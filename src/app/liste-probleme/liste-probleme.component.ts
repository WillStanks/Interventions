import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProbleme } from '../probleme/probleme';
import { ListeProblemeService } from './liste-probleme.service';

@Component({
  selector: 'Inter-liste-probleme',
  templateUrl: './liste-probleme.component.html',
  styleUrls: ['./liste-probleme.component.css']
})
export class ListeProblemeComponent implements OnInit {
  probleme: IProbleme[];
  errorMessage: string;

  constructor(private listeProblemes: ListeProblemeService, private route: Router) { }

  ngOnInit(): void {
    this.listeProblemes.obtenirProblemes()
    .subscribe(probleme => this.probleme = probleme,
      error => this.errorMessage = <any>error);
  }

  deleteProbleme(id: number){
  
    this.listeProblemes.deleteProbleme(id).subscribe({
      error: err => this.errorMessage = err,
      next:() => this.rechargerPage()
    });
    
  }

  showPopup(id: number) {
    let resultat = confirm("Voulez-vous vraiment supprimer le problème " + id + " ?")
    if(resultat){
      this.deleteProbleme(id);
    }
  }

  rechargerPage(): void {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(['/liste-probleme']);
  } 


}
