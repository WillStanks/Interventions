import { TestBed } from '@angular/core/testing';

import { ListeProblemeService } from './liste-probleme.service';

describe('ListeProblemeService', () => {
  let service: ListeProblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeProblemeService);
  });

});
