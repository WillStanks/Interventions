import { Component, OnInit } from '@angular/core';
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

  constructor(private listeProblemes: ListeProblemeService) { }

  ngOnInit(): void {
    this.listeProblemes.obtenirProblemes()
    .subscribe(probleme => this.probleme = probleme,
      error => this.errorMessage = <any>error);
  }

}
