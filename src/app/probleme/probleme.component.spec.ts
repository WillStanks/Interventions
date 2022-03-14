import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { errorMonitor } from 'events';

import { ProblemeComponent } from './probleme.component';
import { TypeProblemeService } from './type-probleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],  // Ajouté
      declarations: [ ProblemeComponent ],
      providers: [TypeProblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it("#1 | Zone PRÉNOM invalide avec 2 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("#2 | Zone PRÉNOM valide avec 3 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeUndefined();  });

  it("#3 | Zone PRÉNOM valide avec 200 caractères", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(200));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBeUndefined();
  });

  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("");
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("#5 | Zone PRÉNOM invalide avec 10 espaces", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(" ".repeat(10));
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractere", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("  1");
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractere", () =>{
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("  1");
    let errors = zone.errors || {};
    expect(errors['nbreCaracteresInsuffisant']).toBe(true);
  });

  it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it("#19 | Zone TELEPHONE est désactivée quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it("#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue();
  });

  it("#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTrue();
  });

  it("#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it("#24 | Zone CONFIRMER COURRIEL est invalide avec un format non conforme", () =>{
    component.appliquerNotifications('Par courriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('a2fds');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null", () =>{
    component.appliquerNotifications('Par courriel');

    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConf = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupeCourriel = component.problemeForm.get('courrielGroup');
    courriel.setValue('');
    courrielConf.setValue('salut@hotmail.com');

    errors = groupeCourriel.errors || {};
    expect(errors['match']).toBeUndefined();
  });
    

  it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null", () =>{
    component.appliquerNotifications('Par courriel');
  
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConf = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupeCourriel = component.problemeForm.get('courrielGroup');
    courriel.setValue('salut@hotmail.com');
    courrielConf.setValue('');
  
    errors = groupeCourriel.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null", () =>{
    component.appliquerNotifications('Par courriel');
    
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConf = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupeCourriel = component.problemeForm.get('courrielGroup');
    courriel.setValue('salut@hotmail.com');
    courrielConf.setValue('');
    
    errors = groupeCourriel.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');
    
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConf = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupeCourriel = component.problemeForm.get('courrielGroup');
    courriel.setValue('salut@hotmail.com');
    courrielConf.setValue('salut123@hotmail.com');
    
    errors = groupeCourriel.errors || {};
    expect(errors['match']).toBeTruthy();
  });

  it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel", () =>{
    component.appliquerNotifications('Par courriel');
    
    let errors = {};
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let courrielConf = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let groupeCourriel = component.problemeForm.get('courrielGroup');
    courriel.setValue('salut123@hotmail.com');
    courrielConf.setValue('salut123@hotmail.com');
    
    errors = groupeCourriel.errors || {};
    expect(errors['match']).toBeUndefined();
  });

  it("#29 | Zone TELEPHONE est activée quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');
    let telephone = component.problemeForm.get('telephone');
    
    expect(telephone.enabled).toBeTrue();
  });

  it("#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    
    expect(courriel.disabled).toBeTrue();
  });

  it("#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    
    expect(courrielConfirmation.disabled).toBeTrue();
  });

  it("#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');

    let errors = {};
    let telephone = component.problemeForm.get('telephone');
    errors = telephone.errors || {};
    
    expect(errors['required']).toBeTruthy();
  });

  it("#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');

    let errors = {};
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('45030422k0')
    errors = telephone.errors || {};
    
    expect(errors['pattern']).toBeTruthy();
  });

  it("#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');

    let errors = {};
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('450304220')
    errors = telephone.errors || {};
    
    expect(errors['minlength']).toBeTruthy();
  });

  it("#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');

    let errors = {};
    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('45030422023')
    errors = telephone.errors || {};
    
    expect(errors['maxlength']).toBeTruthy();
  });

  it("#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte", () =>{
    component.appliquerNotifications('Par message texte');

    let telephone = component.problemeForm.get('telephone');
    telephone.setValue('4503042223')
    
    expect(telephone.valid);
  });

  
});
