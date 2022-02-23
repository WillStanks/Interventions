import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueur zone Validator', () => {
    it('une chaîne vide est invalide', () => {
    let valeurZone = { value: 'abcd' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result).toBeNull();
    });

    it('#7 | une chaine avec 10 espaces est invalide', () => {
    let valeurZone = { value: ' '.repeat(10) }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });
    
    it('#8 | Une phrase avec des mots est valide', () => {
    let valeurZone = { value: 'Vive angular' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result).toBeNull();
    });

    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
    let valeurZone = { value: ' je le veux ' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result).toBeNull();
    });

    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
    let valeurZone = { value: ' xx' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide.', () => {
    let valeurZone = { value: '  x' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
    let valeurZone = { value: '   xxx' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result).toBeNull();
    });
    
    it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
    let valeurZone = { value: '     xxxxx     ' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result).toBeNull();
    });

    it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide.', () => {
    let valeurZone = { value: '' }
    let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(valeurZone as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });

});