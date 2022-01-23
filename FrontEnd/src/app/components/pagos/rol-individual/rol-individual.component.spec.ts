import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolIndividualComponent } from './rol-individual.component';

describe('RolIndividualComponent', () => {
  let component: RolIndividualComponent;
  let fixture: ComponentFixture<RolIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
