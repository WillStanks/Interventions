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
        noTypeProbleme: ['', Validators.required], 
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}],
    });

    this.typesProblemes.obtenirTypeProbleme()
    .subscribe(type => this.typesProbleme = type,
               error => this.errorMessage = <any>error);  
  }

  appliquerNotifications(typeNotifications: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();


    if(typeNotifications === 'Par courriel'){
      courrielControl.setValidators([Validators.required]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
      courrielGroupControl.setValidators([Validators.compose([])])
    }
    else if(typeNotifications === 'Par message texte') {
      telephoneControl.setValidators([Validators.required]);
      telephoneControl.enable();
    }
    
    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
  }
  
  save(): void {
  }
}


