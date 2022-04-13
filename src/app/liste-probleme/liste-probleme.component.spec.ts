import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProblemeComponent } from './liste-probleme.component';

describe('ListeProblemeComponent', () => {
  let component: ListeProblemeComponent;
  let fixture: ComponentFixture<ListeProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
