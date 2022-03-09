import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';

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

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

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

  
});
