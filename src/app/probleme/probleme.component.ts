import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
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
  probleme: IProbleme;

  constructor(private fb: FormBuilder, private typesProblemes: TypeProblemeService, private problemeService: ProblemeService, private route: Router) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
        prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
        nom: ['', [Validators.maxLength(50), Validators.required]],
        noTypeProbleme: ['', Validators.required], 
        notification: ['pasnotification'],
        courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}],
        descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
        noUnite: '',
        dateProbleme: {value: Date(), disabled: true}
    });

    this.typesProblemes.obtenirTypeProbleme()
    .subscribe(type => this.typesProbleme = type,
               error => this.errorMessage = <any>error); 
    this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotifications(value));
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


    if(typeNotifications === 'courriel'){
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationControl.enable();
    }
    else if(typeNotifications === 'messageTexte') {
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
      telephoneControl.enable();
    }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
  
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        //this.probleme.dateProbleme = new Date();
        this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  onSaveComplete(): void { 
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }
}


