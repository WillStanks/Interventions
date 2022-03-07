import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';


@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})


export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup 
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typesProblemes: TypeProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        nom: ['', [Validators.maxLength(50), Validators.required]],
        noTypeProbleme: ['', [Validators.required]]
    });

    this.typesProblemes.obtenirTypeProbleme()
    .subscribe(type => this.typesProbleme = type,
               error => this.errorMessage = <any>error);  
  }
  save(): void {
  }
}


